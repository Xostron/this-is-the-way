// Расширенное описание класса для наглядности
class TodoItemExtended {
	// Статические типы
	public id: number
	public title: string = ""
	public description: string = ""
	public complete: boolean = false

	public constructor(id: number, title: string = "") {
		this.title = title
		this.id = id
	}
	// public - ключевое слово управления доступом - общедоступный метод класса
	public pritDetails(): void {
		console.log("todo", this.id, this.title)
	}
}

// Лаконичное описание класса (опускается public и присваивание в конструкторе переменных)
class TodoItem {
	constructor(
		public id: number,
		public title: string = "",
		public complete: boolean = false
	) {}

	printDetails(): void {
		console.log("todo", this.id, this.title, this.complete)
	}
}
export default TodoItem
