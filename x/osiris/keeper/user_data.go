package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"osiris/x/osiris/types"
)

// SetUserData set a specific userData in the store from its index
func (k Keeper) SetUserData(ctx sdk.Context, userData types.UserData) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserDataKeyPrefix))
	b := k.cdc.MustMarshal(&userData)
	store.Set(types.UserDataKey(
		userData.Creator,
	), b)
}

// GetUserData returns a userData from its index
func (k Keeper) GetUserData(
	ctx sdk.Context,
	index string,

) (val types.UserData, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserDataKeyPrefix))

	b := store.Get(types.UserDataKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveUserData removes a userData from the store
func (k Keeper) RemoveUserData(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserDataKeyPrefix))
	store.Delete(types.UserDataKey(
		index,
	))
}

// GetAllUserData returns all userData
func (k Keeper) GetAllUserData(ctx sdk.Context) (list []types.UserData) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserDataKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.UserData
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
