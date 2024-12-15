import TodoItem from "./todo_item.js";
class TodoCollection {
    userName;
    todoItems;
    nextId = 1;
    // Обощенный тип указывается в <>
    itemMap = new Map();
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        todoItems.forEach((el) => this.itemMap.set(el.id, el));
    }
    // Добавить задачу
    addTodo(title) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, title));
        return this.nextId;
    }
    // Получит задачу по id
    getTodoById(id) {
        return this.itemMap.get(id);
    }
    // Получить все задачи true или только не выполненные false
    getTodoItems(complete) {
        return [...this.itemMap.values()].filter((el) => complete || !el.complete);
    }
    // Задача выполнена/не выполнена
    markComplete(id) {
        const todoItem = this.getTodoById(id);
        todoItem ? (todoItem.complete = !todoItem.complete) : {};
    }
    // Удаление выполненных задач
    removeComplete() {
        this.itemMap.forEach((el) => el.complete ? this.itemMap.delete(el.id) : {});
    }
    // Количество задач
    getItemCounts() {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length,
        };
    }
}
export default TodoCollection;
