// Объединение
type A = { id: string; title: string; log: () => void }
type B = { id: string; name: string; log: () => void, valid:boolean }

type AorB = A | B
type AandB = A & B


const A1: A = { id: "", title: "", log() {} }
const B1: B = { id: "", name: "", log() {}, valid:true }
/**
 * Объединение типов - расширяет тип,
 * обязательное условие новый объект должен реализовывать один тип полностью
 */
const AorB1: AorB = { id: "", name: "", log() {}, valid:true, title:'' }


/**
 * Пересечение - возможен 1 вариант - все поля присутсвуют в объекте
 */
const AandB1: AandB = { id: "", log() {}, name: "", title: "", valid:false }
console.log(111, A1, B1)
console.log(222, AorB1)
console.log(333, AandB1)

export { A, B, AorB, AandB }
