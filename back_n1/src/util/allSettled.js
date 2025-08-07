const p = [
	fetch('https://jsonplaceholder1.typicode.com/todos/1'),
	fetch('https://jsonplaceholder.typicode.com/todos/1'),
	fetch('https://jsonplaceholder.typicode.com/todos/1'),
]
Promise.allSettled(p)
	.then((r)=>{
        // console.log(111, r)
        r = r.map(el=>el.status=='fulfilled' ? el.value.json() : el)
        return Promise.all(r)
    })
    .then(r=>{
        console.log(r)
    })
	.catch((error) => console.log('Ошибка', error))
