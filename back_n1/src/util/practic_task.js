// 1. Напишите функцию, которая переворачивает строку.
// 2. Напишите функцию, проверяющую, является ли строка палиндромом.
// 3. Напишите функцию, которая возвращает массив уникальных элементов.
// 4. Напишите функцию, которая считает факториал числа.
// 5. Напишите функцию, которая проверяет, является ли число простым.
// 6. Напишите функцию, которая удаляет дубликаты из массива.
// 7. Напишите функцию, которая сортирует массив чисел по возрастанию.

// 1. Напишите функцию, которая переворачивает строку.
function reverseStr(str = 'abcde') {
	return str.split('').reverse().join('')
}
console.log(111, reverseStr())
// 2. Напишите функцию, проверяющую, является ли строка палиндромом.
function isPalindrom(str = 'aka') {
	const rvs = str.split('').reverse().join('')
	return rvs == str
}
console.log(222, isPalindrom())
console.log(222, isPalindrom('qwe'))
// 3. Напишите функцию, которая возвращает массив уникальных элементов.
function createArr() {
	return new Array(10).fill(0).map((el, i) => i)
}
console.log(333, createArr())
// 4. Напишите функцию, которая считает факториал числа.
function factorial(n) {
	return n > 1 ? n * factorial(n - 1) : 1
}
console.log(444, factorial(5))
// 5. Напишите функцию, которая проверяет, является ли число простым.
function isSimple(n) {
	if (Math.trunc(n) !== n) return `${n} - составное число!!`
	if (n < 2) return `${n} - составное число!`
	const range = Math.sqrt(n)
	const base = Math.trunc(range)
	const round = Math.ceil(range)
	if (base === range) return `${n} - составное число@`
	for (let i = 2; i < round; i++) {
		if (n % i === 0) return `${n} - составное число#`
	}
	return `${n} - простое число$`
}
console.log(555, isSimple(1.1), isSimple(2.1), isSimple(3), isSimple(4), isSimple(36), isSimple(13))
// 6. Напишите функцию, которая удаляет дубликаты из массива.
function flt(arr) {
	return [...new Set(arr)]
}
console.log(666, flt([1, 2, 3, 4, 5, 5, 5, 4]))
// 7. Напишите функцию, которая сортирует массив чисел по возрастанию.
function toSort(arr) {
	// sort - мутируемый метод, поэтому создаем новый массив при помощи spread
	return [...arr].sort((a, b) => a - b)
}
const arr = [20, 1, 10, 9, 8, 7]
console.log(777, toSort(arr), arr)

const obj = { 123: { y: 12 } }
const obj1 = {}
const jobs = [{ name: '123', id: 123 }]
jobs.forEach((job) => (obj[job.name].job = job))
jobs.forEach((job) => (obj1[job.name] = { job }))
console.log(888, obj, obj1)
