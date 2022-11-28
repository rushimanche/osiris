package sample

import (
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"testing"
)

func TestAddress(t *testing.T) {
	pk := ed25519.GenPrivKey().PubKey()
	addr := pk.Address()
	addrStr := sdk.AccAddress(addr).String()
	if len(addrStr) != 45 {
		t.Fatal("sdk make address error")
	}
}
