/**
 * Массивы
 */
let arr: number[] = [1, 2, 3]
let arr1: (number | object)[] = [{}, 2, 3]
arr1.forEach((el) => console.log(el))

/**
 * Кортежи - массивы фиксированной длины, где каждый элемент имеет разный тип
 * (ограничение длины и типов элементов массива накладывает ts)
 */

let arr2: [object, string, number] = [{}, 'qwe', 12]
// Кортежи с необязательными элементами
let arr3: [object, string, number?] = [{}, 'qwe']
// Кортежи с rest
let arr4: [object, string, number, ...number[]] = [{}, 'qwe', 12, 1, 2]

/**
 * Перечисления  enum - функция Typescript
 */
enum Prod {
	A = 100,
	B = 200,
	D = 300,
} // { '100': 'A', '200': 'B', '300': 'D', A: 100, B: 200, D: 300 }
let prods: [Prod, number][] = [
	[Prod.A, 10],
	[Prod.B, 20],
]

console.log(Prod, prods)

prods.forEach((el: [Prod, number]) => {
	console.log('el', el)
})

console.log(111, Prod.A, Prod[100])

/**
 * Константные перечисления
 */

const enum Warp {
	Loken,
	Alpha,
	Tit,
}
const val = Warp.Loken
console.log('warp', val)

/**
 * Типы с литеральным значением - Задает определенные значение
 */
const r:1|2|3 = 3

/**
 * Псевдонимы типов
 */

type r1 = 1|2|3|4

const v1:r1 = 2