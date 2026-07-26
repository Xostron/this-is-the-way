package main

import (
	"fmt"
	"strconv"
)

func main() {
	// Введите первое число
	left := inputNum("Input left operand", false)
	// Введите знак
	sign := inputSign("Input operation")
	// Введите второе число
	right := inputNum("Input right operand", true)

	var r float64
	switch sign {
	case "+":
		r = left + right
	case "-":
		r = left - right
	case "*":
		r = left * right
	case "/":
		r = left / right
	}
	fmt.Printf("%.3f\n", r)
}

func inputNum(mes string, check bool) float64 {
	var input string
	for {
		fmt.Println(mes)
		// Читаем ввод пользователя
		_, err := fmt.Scanln(&input)
		if err != nil {
			fmt.Println("Invalid input")
			continue // если ошибка чтения, запускаем цикл заново
		}
		// Пытаемся конвертировать строку в число float64
		v, err := strconv.ParseFloat(input, 64)
		if err != nil || (check && v == 0) {
			fmt.Println("Invalid input")
			continue // если ввели буквы, просим ввести заново
		}
		// Если дошли сюда — всё успешно, выходим из цикла
		return v
	}
}

func inputSign(mes string) string {
	var sign string
	// Ввод знака
	for {
		fmt.Println(mes)
		// Читаем ввод пользователя
		_, err := fmt.Scanln(&sign)
		if err != nil {
			fmt.Println("Invalid input")
			continue // если ошибка чтения, запускаем цикл заново
		}
		// Проверка операнда
		if sign != "-" && sign != "+" && sign != "*" && sign != "/" {
			fmt.Println("Invalid input")
			continue
		}
		// Если дошли сюда — всё успешно, выходим из цикла
		return sign
	}
}
