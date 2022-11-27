package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// UserDataKeyPrefix is the prefix to retrieve all UserData
	UserDataKeyPrefix = "UserData/value/"
)

// UserDataKey returns the store key to retrieve a UserData from the index fields
func UserDataKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
