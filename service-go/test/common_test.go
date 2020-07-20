package test

import (
	"os"
	"testing"
)

func TestT(t *testing.T) {
	os.Mkdir("./taaa", os.ModePerm)
}
