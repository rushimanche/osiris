package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "osiris/testutil/keeper"
	"osiris/testutil/nullify"
	"osiris/x/osiris/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestUserDataQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.OsirisKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNUserData(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetUserDataRequest
		response *types.QueryGetUserDataResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetUserDataRequest{
				Index: msgs[0].Index,
			},
			response: &types.QueryGetUserDataResponse{UserData: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetUserDataRequest{
				Index: msgs[1].Index,
			},
			response: &types.QueryGetUserDataResponse{UserData: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetUserDataRequest{
				Index: strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.UserData(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}

func TestUserDataQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.OsirisKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNUserData(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllUserDataRequest {
		return &types.QueryAllUserDataRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.UserDataAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.UserData), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.UserData),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.UserDataAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.UserData), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.UserData),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.UserDataAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.UserData),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.UserDataAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
