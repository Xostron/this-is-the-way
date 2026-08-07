/*
Задание 4. Журнал посещений
Программа реализует 3 команды в интерактивном режиме (команды вводятся в консоль без прерывания основного запуска).
Операция Save позволяет сохранять в картотеку ФИО посетителя, специализацию врача, к которому он приходил, и дата визита.
a. Специализация врача передаётся как строка.
b. Дата визита в формате YYYY-MM-DD.
c. Пример: Save \n Иванов Иван Иванович \n ортопед \n 2024-04-13.
d. \n — перенос строки, Enter.
Операция GetHistory позволяет просмотреть историю посещения пациентом больницы. Принимает ФИО пациента и возвращает список из пар специализация врача и дата визита.
a. Пример: GetHistory \n Иванов Иван Иванович.
b. Ответ: ортопед 2024-04-13 \n невролог 2024-05-24 \n.
c. \n — перенос строки, Enter.
Операция GetLastVisit позволяет получить последнее посещение пациентом определенного специалиста в больнице. Принимает ФИО пациента и специализацию врача и возвращает дату последнего визита.
a. Пример: GetLastVisit \n Иванов Иван Иванович \n ортопед.
b. Ответ: 2024-04-13.
c. \n — перенос строки, Enter.
Если пациент не найден, то программа возвращает ошибку с типом PatientNotFoundError с текстом ошибки patient not found (необходимо реализовать самостоятельно).
Хранение данных осуществляется только в памяти, долгосрочное хранение данных не предусмотрено.

Подсказка: в качестве хранилища можно использовать тип map. Для хранения данных о посещениях необходимо завести дополнительную структуру с полями: специализация и дата посещения.
*/
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	// Ключом будет ФИО пациента (string), а значением — срез визитов ([]Visit).
	var db = NewRegistry()

	// //  Бесконечный интерактивный режим (REPL)
	// // (Read-Eval-Print Loop — «считай-вычисли-выведи-повтори»)
	// // — это интерактивная консоль, в которую ты вводишь строку кода,
	// // она тут же выполняется, результат выводится на экран, и консоль снова ждет ввода.
	scanner := bufio.NewScanner(os.Stdin)

	for {
		if !scanner.Scan() {
			break
		}
		command := scanner.Text()
		switch command {
		case "Save":
			scanner.Scan()
			name := scanner.Text()
			scanner.Scan()
			spec := scanner.Text()
			scanner.Scan()
			date := scanner.Text()
			db.Save(name, spec, date)
		case "GetHistory":
			scanner.Scan()
			name := scanner.Text()
			arr, err := db.GetHistory(name)
			if err != nil {
				fmt.Println(err.Error())
				continue
			}
			for _, el := range arr {
				fmt.Printf("%s %s\n", el.Specialization, el.Date)
			}
		case "GetLastVisit":
			scanner.Scan()
			name := scanner.Text()
			scanner.Scan()
			spec := scanner.Text()
			date, err := db.GetLastVisit(name, spec)
			if err != nil {
				fmt.Println(err.Error())
				continue
			}
			fmt.Println(date)
		default:
			fmt.Println("Неизвестная команда")
		}
	}

}
