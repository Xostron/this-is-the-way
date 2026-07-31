/*
Задание 3. Пересечение срезов
> Программа считывает из консоли первый список чисел, разделенных пробелами; завершить нажатие нужно нажатием Enter.
> Программа считывает из консоли второй список чисел, разделенных пробелами; завершить нажатие нужно нажатием Enter.
> Списки чисел на вход поступают неупорядоченные.
> Программа работает только с числами типа int.
> Программа находит пересечение 2 списков и возвращает в том порядке, в котором они встречаются в первом списке.

Пример:
Ввод:
5 3 4 2 1 6
6 4 2 4
Результат:
4 2 6

Если пересечение пустое, программа выводит текст: «Empty intersection».
Если в списке содержатся числа не типа int, программа выводит ошибку «Invalid input» и завершает свою работу.

go run main.go
*/
package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	str := bufio.NewScanner(os.Stdin)
	// 1 ввод
	in1, err := inputNum(str)
	if err != nil {
		fmt.Println("Invalid input")
		return
	}
	// 2 ввод
	in2, err := inputNum(str)
	if err != nil {
		fmt.Println("Invalid input")
		return
	}

	// Поиск пересечений
	r := fnIntersection(in1, in2)

	// Результат
	fmt.Println(answer(r))
}

func fnIntersection(in1, in2 []int) []int {
	// Заносим второй массив в мапу для быстрого поиска
	hash := make(map[int]bool)
	for _, num := range in2 {
		hash[num] = true
	}

	// Ищем пересечения, перебирая первый массив
	var r []int
	for _, num := range in1 {
		if hash[num] {
			r = append(r, num)
			// Защита от повторяющихся чисел
			hash[num] = false
		}
	}

	return r
}

func answer(r []int) string {
	// Нет пересечений
	if len(r) == 0 {
		return "Empty intersection"
	}
	// Преобразуем массив с пересечениями в строку
	var result []string
	for _, num := range r {
		result = append(result, strconv.Itoa(num))
	}
	return strings.Join(result, " ")
}

// Чтение строки чисел с консоли
func inputNum(str *bufio.Scanner) ([]int, error) {
	str.Scan()
	// Читаем ввод пользователя
	kk := str.Text()
	arr := strings.Fields(kk)
	var nums []int

	for _, k := range arr {
		n, err := strconv.Atoi(k)
		if err != nil {
			return nil, errors.New("invalid input")
		}
		nums = append(nums, n)
	}

	return nums, nil

}
