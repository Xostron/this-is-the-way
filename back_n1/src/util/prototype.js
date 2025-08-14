// Создание объекта
const animal = {
	eats: true,
	walk() {
		console.log('Animal walks')
	},
}

function Animal(name) {
	this.name = name
	this.eats = true
}

const bear = new Animal('BlackBear')
bear.run = true
// Изменение прототипа
Animal.prototype.sleep = function () {
	console.log(`${this.name ?? null} sleeps`)
}

// Создание объекта с прототипом
const rabbit = Object.create(animal)
rabbit.jumps = true
rabbit.walk() // "Animal walks" (из прототипа)
const whiteRabbit = Object.create(rabbit)
whiteRabbit.walk() // "Animal walks" (из прототипа)

bear.sleep()
console.log(rabbit)
console.log(whiteRabbit)
// Проверка принадлежности свойства
console.log('Проверка принадлежности свойства', whiteRabbit.hasOwnProperty('walk')) // false
console.log('Проверка принадлежности свойства', 'jumps' in whiteRabbit) // true (если добавить)

// Доступ к прототипу
console.log('Доступ к прототипу')
console.log(Animal.prototype) // { sayHi: function, constructor: User }
console.log(bear.__proto__) // То же самое (устаревший способ)
console.log(Object.getPrototypeOf(bear)) // Современный способ

const panda = Object.create(bear)
panda.cute = true
// Проверка прототипов (наличия свойств)
console.log('panda sleep', panda.hasOwnProperty('sleep')) //false
console.log('panda cute', panda.hasOwnProperty('cute')) //true
console.log('bear instanceof Animal', bear instanceof Animal) // true
console.log('panda instanceof Animal', panda instanceof Animal) // true
console.log("panda:  'sleep' in panda", 'sleep' in panda) // true
console.log('panda:  Object.getPrototypeOf(panda)', Object.getPrototypeOf(panda)) // Animal { name: 'BlackBear', eats: true, run: true }
console.log('panda:  Object.getPrototypeOf(panda)', Object.getPrototypeOf(panda) === bear) // true - потому что panda создана от bear
console.log(
	'panda:  Object.getPrototypeOf(panda)',
	Object.getPrototypeOf(panda) === Animal.prototype
) // false
console.log('bear:  Object.getPrototypeOf(bear)', Object.getPrototypeOf(bear) === Animal.prototype) // true - т.к. bear создан от класса Animal

// Наследование
// Родительский "класс"
function Vehicle(brand) {
	this.brand = brand
}

Vehicle.prototype.start = function () {
	console.log(`${this.brand} started`)
}

Vehicle.prototype.stop = function () {
	console.log(`${this.brand} stopped`)
}

// Дочерний "класс"
function Car(brand, model) {
	Vehicle.call(this, brand) // Вызов родительского конструктора
	this.model = model
}

// Наследование прототипа
console.log('Наследование прототипа', Car.prototype, Car.prototype.constructor)
Car.prototype = Object.create(Vehicle.prototype)
console.log('Наследование прототипа', Car.prototype, Car.prototype.constructor)
Car.prototype.constructor = Car // Восстановление конструктора
console.log('Наследование прототипа', Car.prototype, Car.prototype.constructor)

// Добавление собственных методов
Car.prototype.honk = function () {
	console.log(`${this.brand} ${this.model} honks`)
}

const myCar = new Car('Toyota', 'Camry')
myCar.start() // "Toyota started"
myCar.honk() // "Toyota Camry honks"

function fn() {
	console.log(this.brand, this.model)
	return this
}

fn()
const s = fn.call(myCar)
console.log(s)

// Object.assing()
const o1 = { id: 12 }
const o2 = { name: 'exodus' }
const o3 = {}
console.log('o3', o3)
const o5 = Object.assign(o3, o1, o2)
console.log('o3', o3)
console.log('o5', o5)
const o4 = Object.assign({}, o2, o1) //Клонирование объекта - новый объект
console.log('o4', o4)
o5.id=42
console.log('o3', o3)
console.log('o5', o5)



const cat = {
  name: 'Феликс',
  color: 'чёрный',
  isHomeless: false,
}

const catInBoots = {
  ...cat,
  name: 'Пушок',
  hasBoots: true,
}

console.log(catInBoots)
// {name: 'Пушок', color: 'чёрный', isHomeless: false, hasBoots: true }

const redCat = Object.assign(cat, { color: 'рыжий', name: 'Борис' })

console.log(redCat, cat)