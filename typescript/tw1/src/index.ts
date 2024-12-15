import TodoItem from "./todo_item.js"
import TodoCollection from "./todo_collection.js"
import inquirer from "inquirer"
import JsonTodoCollection from "./json_collection.js"

let todos: TodoItem[] = [
	new TodoItem(1, "Глава 1"),
	new TodoItem(2, "Глава 2"),
	new TodoItem(3, "Глава 3"),
	new TodoItem(4, "Глава 4"),
]

let collection: TodoCollection = new JsonTodoCollection("Askar", todos)
let showComplete = true
function displayTodoList(): void {
	console.log("this is the way", collection.userName)
	collection.getTodoItems(showComplete).forEach((el) => el.printDetails())
}

enum Commands {
	Add = "Добавить",
	Toggle = "Показать/скрыть задачи",
	Complete = "Отметить задачу как выполненную",
	Purge = "Удалить выполненные задачи",
	Quit = "Выйти",
}

function promptAdd(): void {
	console.clear()
	inquirer
		.prompt({
			type: "input",
			name: "add",
			message: "Введите название задачи",
		})
		.then((r) => {
			if (r["add"] !== "") {
				collection.addTodo(r["add"])
			}
			promptUser()
		})
}

function promptComplete(): void {
	console.clear()
	inquirer
		.prompt({
			type: "checkbox",
			name: "complete",
			message: "Выберите задачу",
			choices: collection.getTodoItems(false).map((el) => ({
				name: el.title,
				value: el.id,
				checked: el.complete,
			})),
		})
		.then((r) => {
			let completedTasks = r["complete"] as number[]
			completedTasks.forEach((id) => collection.markComplete(id))
			promptUser()
		})
}

function promptUser(): void {
	console.clear()
	displayTodoList()
	inquirer
		.prompt({
			type: "list",
			name: "command",
			message: "Выберите действие:",
			choices: Object.values(Commands),
		})
		.then((r) => {
			switch (r["command"]) {
				case Commands.Toggle:
					showComplete = !showComplete
					promptUser()
					break
				case Commands.Add:
					promptAdd()
					break
				case Commands.Complete:
					promptComplete()
					break
				case Commands.Purge:
					collection.removeComplete()
					promptUser()
					break
				case Commands.Quit:
					console.log("Выход")
					break
				default:
					break
			}
		})
}

promptUser()

// {
// type:'list',
// name:'command',
// message:"choose option",
// choices:Object.values(Commands)
// }

// console.clear()
// console.log("this is the way", collection.userName)

// // Добавить задачу
// let todoId: number = collection.addTodo("Глава 5")
// let todoItem: TodoItem = collection.getTodoById(todoId)
// // Показать добавленную задачу
// todoItem.pritDetails()

// // Показать все задачи
// console.log('Выполненные задачи', collection.getItemCounts())
// // collection.getTodoItems(true).forEach((el) => el.pritDetails())

// // Показать не выполненные задачи
// console.log('Не выполненные задачи' , collection.getItemCounts())
// // collection.getTodoItems(false).forEach((el) => el.pritDetails())

// Удалить выполненные задачи и показать
// collection.removeComplete()
// console.log("Оставшиеся задачи", collection.getItemCounts())
// collection.getTodoItems(true).forEach((el) => el.pritDetails())
