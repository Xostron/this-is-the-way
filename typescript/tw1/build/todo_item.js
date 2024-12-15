// Расширенное описание класса для наглядности
class TodoItemExtended {
    // Статические типы
    id;
    title = "";
    description = "";
    complete = false;
    constructor(id, title = "") {
        this.title = title;
        this.id = id;
    }
    // public - ключевое слово управления доступом - общедоступный метод класса
    pritDetails() {
        console.log("todo", this.id, this.title);
    }
}
// Лаконичное описание класса (опускается public и присваивание в конструкторе переменных)
class TodoItem {
    id;
    title;
    complete;
    constructor(id, title = "", complete = false) {
        this.id = id;
        this.title = title;
        this.complete = complete;
    }
    printDetails() {
        console.log("todo", this.id, this.title, this.complete);
    }
}
export default TodoItem;
