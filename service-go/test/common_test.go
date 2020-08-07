package test

import (
	"fmt"
	"testing"
)

type TI interface {
	test()
}

type TestObj struct {
	name string
}

func (t *TestObj) test() {
	fmt.Println(t.name)
}

func TestT(t *testing.T) {
	// var arr []*TI

	// test1 := new(TestObj)
	// test1.name = "test1"
	// test2 := new(TestObj)
	// test2.name = "test2"

	// var p1 TI = test1
	// var p2 TI = test2

	// arr = append(arr, &p1, &p2)

	// t.Log(arr)

	// for _, item := range arr {
	// 	var a TI = *item
	// 	a.test()
	// }

	// var ttt TestObj
	// t.Log(ttt)
}
