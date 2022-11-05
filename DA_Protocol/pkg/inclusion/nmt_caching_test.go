package inclusion

import (
	"bytes"
	"crypto/rand"
	"sort"
	"testing"

	"github.com/celestiaorg/celestia-app/pkg/appconsts"
	"github.com/celestiaorg/celestia-app/pkg/da"
	"github.com/celestiaorg/celestia-app/pkg/wrapper"
	"github.com/celestiaorg/nmt"
	"github.com/celestiaorg/rsmt2d"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestWalkCachedSubTreeRoot(t *testing.T) {
	// create the first main tree
	strc := newSubTreeRootCacher()
	oss := uint64(8)
	tr := wrapper.NewErasuredNamespacedMerkleTree(oss, 0, nmt.NodeVisitor(strc.Visit))
	d := []byte{0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 4, 5, 6, 7, 8}
	for i := 0; i < 8; i++ {
		tr.Push(d)
	}
	highestRoot := tr.Root()

	// create a short sub tree
	shortSubTree := wrapper.NewErasuredNamespacedMerkleTree(oss, 0)
	for i := 0; i < 2; i++ {
		shortSubTree.Push(d)
	}
	shortSTR := shortSubTree.Root()

	// create a tall sub tree root
	tallSubTree := wrapper.NewErasuredNamespacedMerkleTree(oss, 0)
	for i := 0; i < 4; i++ {
		tallSubTree.Push(d)
	}
	tallSTR := tallSubTree.Root()

	type test struct {
		name          string
		path          []WalkInstruction
		subTreeRoot   []byte
		expectedError string
	}

	tests := []test{
		{
			"left most short sub tree",
			[]WalkInstruction{WalkLeft, WalkLeft},
			shortSTR,
			"",
		},
		{
			"left middle short sub tree",
			[]WalkInstruction{WalkLeft, WalkRight},
			shortSTR,
			"",
		},
		{
			"right middle short sub tree",
			[]WalkInstruction{WalkRight, WalkLeft},
			shortSTR,
			"",
		},
		{
			"right most short sub tree",
			[]WalkInstruction{WalkRight, WalkRight},
			shortSTR,
			"",
		},
		{
			"left most tall sub tree",
			[]WalkInstruction{WalkLeft},
			tallSTR,
			"",
		},
		{
			"right most tall sub tree",
			[]WalkInstruction{WalkRight},
			tallSTR,
			"",
		},
		{
			"right most tall sub tree",
			[]WalkInstruction{WalkRight, WalkRight, WalkRight, WalkRight},
			tallSTR,
			"did not find sub tree root",
		},
	}

	for _, tt := range tests {
		foundSubRoot, err := strc.walk(highestRoot, tt.path)
		if tt.expectedError != "" {
			require.Error(t, err, tt.name)
			assert.Contains(t, err.Error(), tt.expectedError, tt.name)
			continue
		}

		require.NoError(t, err)
		require.Equal(t, tt.subTreeRoot, foundSubRoot, tt.name)
	}
}

func TestEDSSubRootCacher(t *testing.T) {
	oss := uint64(8)
	d := generateRandNamespacedRawData(uint32(oss*oss), appconsts.NamespaceSize, appconsts.ShareSize-appconsts.NamespaceSize)
	stc := NewSubtreeCacher(oss)

	eds, err := rsmt2d.ComputeExtendedDataSquare(d, appconsts.DefaultCodec(), stc.Constructor)
	require.NoError(t, err)

	dah := da.NewDataAvailabilityHeader(eds)

	for i := range dah.RowsRoots[:oss] {
		expectedSubTreeRoots := calculateSubTreeRoots(eds.Row(uint(i))[:oss], 2)
		require.NotNil(t, expectedSubTreeRoots)
		// note: the depth is one greater than expected because we're dividing
		// the row in half when we calculate the expected roots.
		result, err := stc.getSubTreeRoot(dah, i, []WalkInstruction{false, false, false})
		require.NoError(t, err)
		assert.Equal(t, expectedSubTreeRoots[0], result)
	}
}

// calculateSubTreeRoots generates the subtree roots for a given row. If the
// selected depth is too deep for the tree, nil is returned. It relies on
// passing a row whose length is a power of 2 and assumes that the row is
// **NOT** extended since calculating subtree root for erasure data using the
// nmt wrapper makes this difficult.
func calculateSubTreeRoots(row [][]byte, depth int) [][]byte {
	subLeafRange := len(row)
	for i := 0; i < depth; i++ {
		subLeafRange = subLeafRange / 2
	}

	if subLeafRange == 0 || subLeafRange%2 != 0 {
		return nil
	}

	count := len(row) / subLeafRange
	subTreeRoots := make([][]byte, count)
	chunks := chunkSlice(row, subLeafRange)
	for i, rowChunk := range chunks {
		tr := wrapper.NewErasuredNamespacedMerkleTree(uint64(len(row)), 0)
		for _, r := range rowChunk {
			tr.Push(r)
		}
		subTreeRoots[i] = tr.Root()
	}

	return subTreeRoots
}

func chunkSlice(slice [][]byte, chunkSize int) [][][]byte {
	var chunks [][][]byte
	for i := 0; i < len(slice); i += chunkSize {
		end := i + chunkSize

		// necessary check to avoid slicing beyond
		// slice capacity
		if end > len(slice) {
			end = len(slice)
		}

		chunks = append(chunks, slice[i:end])
	}

	return chunks
}

func generateRandNamespacedRawData(total, nidSize, leafSize uint32) [][]byte {
	data := make([][]byte, total)
	for i := uint32(0); i < total; i++ {
		nid := make([]byte, nidSize)
		_, _ = rand.Read(nid)
		data[i] = nid
	}
	sortByteArrays(data)
	for i := uint32(0); i < total; i++ {
		d := make([]byte, leafSize)
		_, _ = rand.Read(d)
		data[i] = append(data[i], d...)
	}

	return data
}

func sortByteArrays(src [][]byte) {
	sort.Slice(src, func(i, j int) bool { return bytes.Compare(src[i], src[j]) < 0 })
}
