import TodoItem from "./todo_item.js"

// Структура типа
type ItemCounts = {
	total: number
	incomplete: number
}

class TodoCollection {
	private nextId: number = 1
	// Обощенный тип указывается в <>
	protected itemMap = new Map<number, TodoItem>()

	constructor(public userName: string, public todoItems: TodoItem[] = []) {
		todoItems.forEach((el) => this.itemMap.set(el.id, el))
	}

	// Добавить задачу
	addTodo(title: string): number {
		while (this.getTodoById(this.nextId)) {
			this.nextId++
		}
		this.itemMap.set(this.nextId, new TodoItem(this.nextId, title))
		return this.nextId
	}
	// Получит задачу по id
	getTodoById(id: number): TodoItem {
		return this.itemMap.get(id)
	}
	// Получить все задачи true или только не выполненные false
	getTodoItems(complete: boolean): TodoItem[] {
		return [...this.itemMap.values()].filter(
			(el) => complete || !el.complete
		)
	}
	// Задача выполнена/не выполнена
	markComplete(id: number) {
		const todoItem = this.getTodoById(id)
		todoItem ? (todoItem.complete = !todoItem.complete) : {}
	}

	// Удаление выполненных задач
	removeComplete() {
		this.itemMap.forEach((el) =>
			el.complete ? this.itemMap.delete(el.id) : {}
		)
	}
	// Количество задач
	getItemCounts(): ItemCounts {
		return {
			total: this.itemMap.size,
			incomplete: this.getTodoItems(false).length,
		}
	}
}

export default TodoCollection
