const p = [
	fetch('https://jsonplaceholder.typicode.com/todos/1'),
	foo(10, 2),
	fetch('https://jsonplaceholder.typicode.com/todos/2'),
	fetch('https://jsonplaceholder.typicode.com/todos/3'),
]
const p2 = [
	fetch('https://jsonplaceholder.typicode.com/todos/1'),
	foo(21, 21),
	fetch('https://jsonplaceholder.typicode.com/todos/2'),
	fetch('https://jsonplaceholder.typicode.com/todos/3'),
]

function foo(x, y) {
	return x + y
}

function promiseAll(promises = []) {
	return new Promise((resolve, reject) => {
		const result = []
		let count = 0
		promises.forEach((fn, idx) => {
			// Promise.resolve создает успешно выполнившийся промис.
			// fn - может быть любым значением, например  промисом (fetch('https://jsonplaceholder.typicode.com/todos/3'),)
			// так и обычным числом возвращаемого функцией foo(10, 2), от обычного числа не построить
			// асинхронную цепочку, поэтому для правильной обработки "самописного Promise.all"
			// все значения из массива превращаем в промис.
			Promise.resolve(fn)
				.then((r) => (r instanceof Response ? r.json() : r))
				.then((r) => {
					result[idx] = r
					count++
					if (count === promises.length) resolve(result)
				})
				.catch(reject)
		})
	})
}
// Самописный Promise.all
promiseAll(p)
	.then((r) => console.log(111, r))
	.catch(console.error)

// JS Promise.all
Promise.all(p2)
	.then((r) => {
		r = r.map((el) => (el instanceof Response ? el.json() : el))
		return Promise.all(r)
	})
	.then((r) => console.log(222, r))
	.catch(console.error)
