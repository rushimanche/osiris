package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSaveUserData = "save_user_data"

var _ sdk.Msg = &MsgSaveUserData{}

func NewMsgSaveUserData(creator string, message string) *MsgSaveUserData {
	return &MsgSaveUserData{
		Creator:  creator,
		Message: message,
	}
}

func (msg *MsgSaveUserData) Route() string {
	return RouterKey
}

func (msg *MsgSaveUserData) Type() string {
	return TypeMsgSaveUserData
}

func (msg *MsgSaveUserData) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSaveUserData) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSaveUserData) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
