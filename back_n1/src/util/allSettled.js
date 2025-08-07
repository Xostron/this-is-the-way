const p = [
	fetch('https://jsonplaceholder1.typicode.com/todos/1'),
	fetch('https://jsonplaceholder.typicode.com/todos/1'),
	fetch('https://jsonplaceholder.typicode.com/todos/1'),
]
Promise.allSettled(p)
	.then((r) => {
		r = r.map((el) => (el.status == 'fulfilled' ? el.value.json() : el))
		return Promise.all(r)
	})
	.then((r) => {
		r.forEach
		// console.log(r)
	})
	.catch((error) => console.log('Ошибка', error))

fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then((r) => r.json())
	.then((r) => {
		console.log(r)
        if (r.id===1) throw new Error('fucked up')
		// throw new Error('Синхронная ошибка') // Не будет поймана
	})
	.catch((error) => {
		console.log('Error 12', error.message, error)
		// Этот catch не сработает!
	})
