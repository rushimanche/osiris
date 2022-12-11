package math

import (
	"bytes"
	"encoding/hex"
	"math/big"
	"testing"
)

func TestHexOrDecimal256(t *testing.T) {
	tests := []struct {
		input string
		num   *big.Int
		ok    bool
	}{
		{"", big.NewInt(0), true},
		{"0", big.NewInt(0), true},
		{"0x0", big.NewInt(0), true},
		{"12345678", big.NewInt(12345678), true},
		{"0x12345678", big.NewInt(0x12345678), true},
		{"0X12345678", big.NewInt(0x12345678), true},
		// Tests for leading zero behaviour:
		{"0123456789", big.NewInt(123456789), true}, // note: not octal
		{"00", big.NewInt(0), true},
		{"0x00", big.NewInt(0), true},
		{"0x012345678abc", big.NewInt(0x12345678abc), true},
		// Invalid syntax:
		{"abcdef", nil, false},
		{"0xgg", nil, false},
		// Larger than 256 bits:
		{"115792089237316195423570985008687907853269984665640564039457584007913129639936", nil, false},
	}
	for _, test := range tests {
		var num HexOrDecimal256
		err := num.UnmarshalText([]byte(test.input))
		if (err == nil) != test.ok {
			t.Errorf("ParseBig(%q) -> (err == nil) == %t, want %t", test.input, err == nil, test.ok)
			continue
		}
		if test.num != nil && (*big.Int)(&num).Cmp(test.num) != 0 {
			t.Errorf("ParseBig(%q) -> %d, want %d", test.input, (*big.Int)(&num), test.num)
		}
	}
}
func TestMustParseBig256(t *testing.T) {
	defer func() {
		if recover() == nil {
			t.Error("MustParseBig should've panicked")
		}
	}()
	MustParseBig256("ggg")
}

func TestBigMax(t *testing.T) {
	a := big.NewInt(10)
	b := big.NewInt(5)

	max1 := BigMax(a, b)
	if max1 != a {
		t.Errorf("Expected %d got %d", a, max1)
	}

	max2 := BigMax(b, a)
	if max2 != a {
		t.Errorf("Expected %d got %d", a, max2)
	}
}

func TestBigMin(t *testing.T) {
	a := big.NewInt(10)
	b := big.NewInt(5)

	min1 := BigMin(a, b)
	if min1 != b {
		t.Errorf("Expected %d got %d", b, min1)
	}

	min2 := BigMin(b, a)
	if min2 != b {
		t.Errorf("Expected %d got %d", b, min2)
	}
}

func TestFirstBigSet(t *testing.T) {
	tests := []struct {
		num *big.Int
		ix  int
	}{
		{big.NewInt(0), 0},
		{big.NewInt(1), 0},
		{big.NewInt(2), 1},
		{big.NewInt(0x100), 8},
	}
	for _, test := range tests {
		if ix := FirstBitSet(test.num); ix != test.ix {
			t.Errorf("FirstBitSet(b%b) = %d, want %d", test.num, ix, test.ix)
		}
	}
}

func TestPaddedBigBytes(t *testing.T) {
	tests := []struct {
		num    *big.Int
		n      int
		result []byte
	}{
		{num: big.NewInt(0), n: 4, result: []byte{0, 0, 0, 0}},
		{num: big.NewInt(1), n: 4, result: []byte{0, 0, 0, 1}},
		{num: big.NewInt(512), n: 4, result: []byte{0, 0, 2, 0}},
		{num: BigPow(2, 32), n: 4, result: []byte{1, 0, 0, 0, 0}},
	}
	for _, test := range tests {
		if result := PaddedBigBytes(test.num, test.n); !bytes.Equal(result, test.result) {
			t.Errorf("PaddedBigBytes(%d, %d) = %v, want %v", test.num, test.n, result, test.result)
		}
	}
}

func BenchmarkPaddedBigBytesLargePadding(b *testing.B) {
	bigint := MustParseBig256("123456789123456789123456789123456789")
	for i := 0; i < b.N; i++ {
		PaddedBigBytes(bigint, 200)
	}
}

func BenchmarkPaddedBigBytesSmallPadding(b *testing.B) {
	bigint := MustParseBig256("0x18F8F8F1000111000110011100222004330052300000000000000000FEFCF3CC")
	for i := 0; i < b.N; i++ {
		PaddedBigBytes(bigint, 5)
	}
}

func BenchmarkPaddedBigBytesSmallOnePadding(b *testing.B) {
	bigint := MustParseBig256("0x18F8F8F1000111000110011100222004330052300000000000000000FEFCF3CC")
	for i := 0; i < b.N; i++ {
		PaddedBigBytes(bigint, 32)
	}
}

func BenchmarkByteAtBrandNew(b *testing.B) {
	bigint := MustParseBig256("0x18F8F8F1000111000110011100222004330052300000000000000000FEFCF3CC")
	for i := 0; i < b.N; i++ {
		bigEndianByteAt(bigint, 15)
	}
}

func BenchmarkByteAt(b *testing.B) {
	bigint := MustParseBig256("0x18F8F8F1000111000110011100222004330052300000000000000000FEFCF3CC")
	for i := 0; i < b.N; i++ {
		bigEndianByteAt(bigint, 15)
	}
}

func BenchmarkByteAtOld(b *testing.B) {
	bigint := MustParseBig256("0x18F8F8F1000111000110011100222004330052300000000000000000FEFCF3CC")
	for i := 0; i < b.N; i++ {
		PaddedBigBytes(bigint, 32)
	}
}

func TestReadBits(t *testing.T) {
	check := func(input string) {
		want, _ := hex.DecodeString(input)
		i, _ := new(big.Int).SetString(input, 16)
		buf := make([]byte, len(want))
		ReadBits(i, buf)
		if !bytes.Equal(buf, want) {
			t.Errorf("have: %x\nwant: %x", buf, want)
		}
	}
	check("000000000000000000000000000000000000000000000000000000FEFCF3F8F0")
	check("0000000000012345000000000000000000000000000000000000FEFCF3F8F0")
	check("18F8F8F1000111000110011100222004330052300000000000000000FEFCF3F8F0")
}
