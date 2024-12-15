import TodoItem from "./todo_item.js";
import inquirer from "inquirer";
import JsonTodoCollection from "./json_collection.js";
let todos = [
    new TodoItem(1, "Глава 1"),
    new TodoItem(2, "Глава 2"),
    new TodoItem(3, "Глава 3"),
    new TodoItem(4, "Глава 4"),
];
let collection = new JsonTodoCollection("Askar", todos);
let showComplete = true;
function displayTodoList() {
    console.log("this is the way", collection.userName);
    collection.getTodoItems(showComplete).forEach((el) => el.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C";
    Commands["Toggle"] = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C/\u0441\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0438";
    Commands["Complete"] = "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443 \u043A\u0430\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u0443\u044E";
    Commands["Purge"] = "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438";
    Commands["Quit"] = "\u0412\u044B\u0439\u0442\u0438";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear();
    inquirer
        .prompt({
        type: "input",
        name: "add",
        message: "Введите название задачи",
    })
        .then((r) => {
        if (r["add"] !== "") {
            collection.addTodo(r["add"]);
        }
        promptUser();
    });
}
function promptComplete() {
    console.clear();
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
        let completedTasks = r["complete"];
        completedTasks.forEach((id) => collection.markComplete(id));
        promptUser();
    });
}
function promptUser() {
    console.clear();
    displayTodoList();
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
                showComplete = !showComplete;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                promptComplete();
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
            case Commands.Quit:
                console.log("Выход");
                break;
            default:
                break;
        }
    });
}
promptUser();
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
