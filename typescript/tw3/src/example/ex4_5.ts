/**
 * Обобщенные типы Generic types - Дженерики - заполнители типов,
 * которые заменяются конкретными типами при использовании класса или функции.
 * Обеспечивает типобезопасный код для работы с классами коллекций
 */

interface A {
	id: string
	log: () => void
	title: string
}
interface B {
	id: string
	log: () => void
	name: string
}

class AA implements A {
	constructor(public id: string, public title: string) {}
	log: () => void
}

class BB implements B {
	constructor(public id: string, public name: string) {}
	log: () => void
}

/**
 * Класс для обработки коллекций
 * В данном примере показывается, как дженерик <> позволяет данный класс
 * сделать универсальным для обработки экземпляров классов А и В
 * Дженерик Т говорит классу AB, что его тип будет определен при создании экземпляра
 */

class AB<T> {
	private collection: T[] = []
	constructor(arr: T[]) {
		this.collection = arr
	}
	size(): number {
		return this.collection.length
	}
}

const arrA = [new AA("1", "q"), new AA("2", "qq")]
const arrB = [new AA("3", "w"), new AA("4", "ww"), new AA("5", "www")]

const arrAA = new AB(arrA)
const arrBB = new AB(arrB)

console.log(arrAA.size())
console.log(arrBB.size())
