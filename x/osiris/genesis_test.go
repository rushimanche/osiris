package osiris_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "osiris/testutil/keeper"
	"osiris/testutil/nullify"
	"osiris/x/osiris"
	"osiris/x/osiris/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		UserDataList: []types.UserData{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.OsirisKeeper(t)
	osiris.InitGenesis(ctx, *k, genesisState)
	got := osiris.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.UserDataList, got.UserDataList)
	// this line is used by starport scaffolding # genesis/test/assert
}
