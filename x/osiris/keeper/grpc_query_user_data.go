package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"osiris/x/osiris/types"
)

func (k Keeper) UserDataAll(c context.Context, req *types.QueryAllUserDataRequest) (*types.QueryAllUserDataResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var userDatas []types.UserData
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	userDataStore := prefix.NewStore(store, types.KeyPrefix(types.UserDataKeyPrefix))

	pageRes, err := query.Paginate(userDataStore, req.Pagination, func(key []byte, value []byte) error {
		var userData types.UserData
		if err := k.cdc.Unmarshal(value, &userData); err != nil {
			return err
		}

		userDatas = append(userDatas, userData)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllUserDataResponse{UserData: userDatas, Pagination: pageRes}, nil
}

func (k Keeper) UserData(c context.Context, req *types.QueryGetUserDataRequest) (*types.QueryGetUserDataResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetUserData(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetUserDataResponse{UserData: val}, nil
}
