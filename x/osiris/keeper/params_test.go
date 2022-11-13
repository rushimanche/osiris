package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "osiris/testutil/keeper"
	"osiris/x/osiris/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.OsirisKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
