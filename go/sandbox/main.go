package main

import (
	"fmt"
	"math/cmplx"
	"math/rand"
)

func add(x, y int) int {
	return x + y
}
func fn1(x int, s string) (int, string) {
	return x, s
}

func fn2(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

var c, python, java bool
var i, j int = 1, 2
var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
	fmt.Println("Hello Xostron")
	fmt.Println("My favorite number is", rand.Intn(10))
	fmt.Println("add", add(1, 20))
	a, b := fn1(12, "xostron")
	fmt.Println("fn1", a, b)
	fmt.Println("fn2 = ")
	fmt.Println(fn2(12))
	var k int
	var n, m int = 1, 2
	q := 3
	aa, bb, cc := true, false, "no!"
	fmt.Println("Переменные var", i, j, k, c, python, java, n, m, q, aa, bb, cc)
	fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)
	fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt)
	fmt.Printf("Type: %T Value: %v\n", z, z)
	var ii int
	var ff float64
	var gg bool
	var hh string
	fmt.Printf("%v %v %v %q\n", ii, ff, gg, hh)
}
