const handler = {
	set(obj, prop, value) {
		console.log('set', obj, prop, value)
		obj[prop] = value
		return true
	},
	get(obj, prop, receiver) {
		console.log('get', obj, prop, receiver)
		return obj[prop]
	},
}

const qwe = { id: 12, name:'Xos' }
const person = new Proxy(qwe, handler)
person.age = 25 // OK
console.log(111, person, person.age, person.id)
console.log(111, qwe, qwe.age)