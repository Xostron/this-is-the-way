/**
 * Обобщенные типы Generic types - Дженерики - заполнители типов,
 * которые заменяются конкретными типами при использовании класса или функции.
 * Обеспечивает типобезопасный код для работы с классами коллекций
 */

type A = { id: string; title: string; log: () => void }
type B = { id: string; name: string; log: () => void; valid: boolean }


interface Port0{
    type:string
}

interface Port1<T extends A> {
	type: string
}

// Расширение
interface Port2<T extends A> extends Port1<A> {
	type: string
}

interface Port3<T extends A | B> {
	type: string
}


class AA0 implements Port0 {
	constructor(public type: string) {}
}

class AA1 implements Port1<A> {
	constructor(public type: string) {}
}

class AA2 implements Port2<A> {
	constructor(public type: string) {}
}

class AA3 implements Port3<A | B> {
	constructor(public type: string) {}
}

const A1 = new AA3("12")
console.log(A1)

export {Port0, Port1, Port2, Port3}