import TodoItem from "./todo_item.js";
import TodoCollection from "./todo_collection.js";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
export default class JsonTodoCollection extends TodoCollection {
    userName;
    db;
    constructor(userName, todoItems = []) {
        super(userName, todoItems);
        this.userName = userName;
        this.db = new LowSync(new JSONFileSync("Todos.json"), { tasks: [] });
        this.db.read();
        if (this.db.data == null) {
            this.db.data = { tasks: todoItems };
            this.db.write();
            todoItems.forEach((el) => this.itemMap.set(el.id, el));
        }
        else {
            this.db.data.tasks.forEach((el) => this.itemMap.set(el.id, new TodoItem(el.id, el.title, el.complete)));
        }
    }
    addTodo(title) {
        let r = super.addTodo(title);
        this.storeTasks();
        return r;
    }
    markComplete(id) {
        super.markComplete(id);
        this.storeTasks();
    }
    removeComplete() {
        super.removeComplete();
        this.storeTasks();
    }
    storeTasks() {
        this.db.data.tasks = [...this.itemMap.values()];
        this.db.write();
    }
}
