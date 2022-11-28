package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"osiris/x/osiris/types"
)

func (k msgServer) SaveUserData(goCtx context.Context, msg *types.MsgSaveUserData) (*types.MsgSaveUserDataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

  // Create variable of type Recipe
  var userData = types.UserData{
     Creator: msg.Creator,
     Message: msg.Message,
  }

  // Add a recipe to the store and get back the ID
  k.SetUserData(ctx, userData)

  // Return the ID of the recipe
  return &types.MsgSaveUserDataResponse{}, nil
}
