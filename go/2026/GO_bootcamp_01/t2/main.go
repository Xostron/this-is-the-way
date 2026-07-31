/*
Задание 2. Наиболее часто встречающиеся слова
Необходимо реализовать программу, на вход которой подаётся список слов и некоторое число K, результатом выполнения является отсортированный по возрастанию список из K наиболее часто встречающихся слов.

> Программа считывает строку со словами.
> Программа считывает число K, ограничение на количество слов.
> Программа определяет, сколько раз каждое слово встречается в строке.
> Программа сортирует результирующий массив по убыванию и возвращает K первых слов.
> Разделителем для слов является символ пробела.
> Если слов в строке меньше K, то выводится список из всех уникальных слов, отсортированных по их частоте вхождения в строку.
> Если на вход подана пустая строка, то на выходе будет пустая строка.
> Словом является любой символ, разделенный пробелами.
> Если слова имеют одинаковую частоту, то должны быть отсортированы лексикографически.
> Необходимо реализовать тесты для проверки сценариев:

	a. обычное поведение с K меньшим, чем количество уникальных слов;
	b. передача пустого списка слов;
	c. передача списка слов, где K больше, чем число уникальных слов.

Пример:
Входные данные:
aa bb cc aa cc cc cc aa ab ac bb
3

Результат:
cc aa bb
Так как cc встречается 4 раза, aa — 3 раза, bb — 2 раза.
*/
package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

type WordStat struct {
	Word  string
	Count int
}

func main() {
	// Исходная строка
	str := bufio.NewScanner(os.Stdin)
	str.Scan()
	line := str.Text()

	// Проверка на пустую строку
	if line == "" {
		fmt.Println("")
		return
	}

	// Ждем ввод числа - ограничение на количество слов
	k := inputNum(str)

	// Анализ строки
	r := search(line, k)

	// Результат
	fmt.Println(r)
}

// Поиск наиболее частых слов в строке
func search(line string, k int) string {

	// Разбиваем строку на слова
	words := strings.Fields(line)

	// массив -> мапа
	counts := make(map[string]int)
	for _, word := range words {
		counts[word]++
	}

	// мапа -> срез (массив объектов)
	// Создаем пустой срез структур
	var stats []WordStat
	for word, count := range counts {
		stats = append(stats, WordStat{Word: word, Count: count})
	}

	// Сортировка среза
	sort.Slice(stats, func(a, b int) bool {
		if stats[a].Count != stats[b].Count {
			return stats[a].Count > stats[b].Count
		}
		return stats[a].Word < stats[b].Word
	})

	// Проверка числа ограничения слов
	if k > len(stats) {
		k = len(stats)
	}

	// Массив наиболее частых слов в кол-во k
	var resultWords []string
	for i := 0; i < k; i++ {
		resultWords = append(resultWords, stats[i].Word)
	}

	return strings.Join(resultWords, " ")
}

// Обработка ввод числа с консоли
func inputNum(str *bufio.Scanner) int {
	for {
		str.Scan()
		// Читаем ввод пользователя
		kk := str.Text()
		k, err := strconv.Atoi(kk)

		if err != nil {
			fmt.Println("Invalid input")
			continue // если ошибка чтения, запускаем цикл заново
		}
		// Если дошли сюда — всё успешно, выходим из цикла
		return k
	}
}
