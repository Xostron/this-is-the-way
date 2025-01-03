/**
 * Функции-конструкторы
 */
type A = {
	id: string
	name: string
}

type AA = {
	id: string
	name: string
	info: () => void
}

const o = function (id: string, name: string) {
	this.id = id
	this.name = name
}
o.prototype.info = function () {
	console.log(111, this.id, this.name)
}

const oo = new o("id12", "xos")

oo.info()

/**
 * Классы
 */

interface Uni {
	id: string
	name: string
	info(): void
}

class Obi implements Uni {
	constructor(public readonly id: string, public name: string) {}
	info() {
		console.log(222, this.id, this.name)
	}
}

const obj = new Obi("id42", "xoss")
obj.info()

interface Ultra {
	pro: number
}

// Несколько интерфейсов
class Ultraa implements Uni, Ultra {
	constructor(
		public readonly id: string,
		public name: string,
		public pro: number
	) {}
	info() {
		console.log(333, this.id, this.name, this.pro)
	}
}

const ultra = new Ultraa("id1242", "xostron", 12)
ultra.info()

// Расширение интерфейсов
interface Max extends Ultra {
	max: number
}

class ProMax implements Max {
	constructor(public pro: number, public max: number) {}
}

const proMax = new ProMax(12, 42)
console.log(444, proMax)

/*
Абстрактные классы - классы, которые не могут иметь собственных экземпляров, они служат для описания подклассов
Абстрактные методы - методы которые должны быть реализованы в подклассе
Обычные методы наследуются
Итог абстрактный класс - как шаблон
 */
abstract class Template {
	constructor(public id: string, public name: string) {}
	info(): void {
		console.log(555, this.id, this.name)
	}
	type(): string {
		return this.id + "-" + this.name
	}
	abstract log(): void
}

class O1 extends Template {
	constructor(public id: string, public name: string) {
		super(id, name)
	}
	log(): void {
		console.log(666)
	}
}

const OO1 = new O1("qwe", "QWE")
console.log(777, OO1)
OO1.info()
console.log(OO1.type())
OO1.log()
