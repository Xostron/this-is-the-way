import TodoItem from "./todo_item.js"
import TodoCollection from "./todo_collection.js"
import { LowSync } from "lowdb"
import { JSONFileSync } from "lowdb/node"

type schemaType = {
	tasks: { id: number; title: string; complete: boolean }[]
}

export default class JsonTodoCollection extends TodoCollection {
	private db: LowSync<schemaType>

	constructor(public userName: string, todoItems: TodoItem[] = []) {
		super(userName, todoItems)
		this.db = new LowSync(new JSONFileSync("Todos.json"), { tasks: [] })
		this.db.read()
		if (this.db.data == null) {
			this.db.data = { tasks: todoItems }
			this.db.write()
			todoItems.forEach((el) => this.itemMap.set(el.id, el))
		} else {
			this.db.data.tasks.forEach((el) =>
				this.itemMap.set(
					el.id,
					new TodoItem(el.id, el.title, el.complete)
				)
			)
		}
	}

	addTodo(title: string): number {
		let r = super.addTodo(title)
		this.storeTasks()
		return r
	}

	markComplete(id: number): void {
		super.markComplete(id)
		this.storeTasks()
	}

	removeComplete(): void {
		super.removeComplete()
		this.storeTasks()
	}

	private storeTasks() {
		this.db.data.tasks = [...this.itemMap.values()]
		this.db.write()
	}
}
