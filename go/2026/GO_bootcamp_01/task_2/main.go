package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	// "strconv"
)

type WordStat struct {
	Word  string
	Count int
}

func main() {
	// Читаем строку
	str := bufio.NewScanner(os.Stdin)
	str.Scan()
	line := str.Text()

	// Разбиваем строку на слова
	words := strings.Fields(line)

	// Создание мапы
	counts := make(map[string]int)
	for v, word := range words {
		fmt.Println(11, v, word)
		counts[word]++
	}
	fmt.Println("input", line, "words", words)
	fmt.Println("counts", counts)
	// return []string{}
}
