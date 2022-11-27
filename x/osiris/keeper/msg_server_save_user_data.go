package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"osiris/x/osiris/types"
)

func (k msgServer) SaveUserData(goCtx context.Context, msg *types.MsgSaveUserData) (*types.MsgSaveUserDataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgSaveUserDataResponse{}, nil
}
