import { useEffect } from 'react'

export default function OOP() {
	const obj1 = new (Alpha1 as any)(12, 'Ingo Peck')
	const obj2 = new (Alpha2 as any)(42, 'Exodus')
	console.log(111, obj1, obj2)
	obj1.sum(6 + 6)
	obj2.sum(6 + 6)
	obj1.saveStorage({ owner: 'obj1' })
	obj2.saveStorage({ owner: 'obj2' })
	useEffect(() => {}, [])
	return (
		<main>
			Прототипы: {obj1.name} {obj2.name}
		</main>
	)
}

interface IAlpha {
	id: string | number
	name: string
	sum?: (x: number, y: number) => void
	saveStorage?: (obj: { id: string | number; name: string }) => void
}
// Функция конструктор
function Alpha2(this: IAlpha, id: string | number, name: string): void {
	this.id = id
	this.name = name
	this.sum = (x, y) => {
		return x + y
	}
	this.saveStorage = (obj: { id: string | number; name: string }) => {
		console.log('saveStorage', obj)
		localStorage.setItem(this.id.toString(), JSON.stringify(obj))
	}
}
// Класс
class Alpha1 {
	id: string | number
	name: string

	constructor(id: string | number, name: string) {
		this.id = id
		this.name = name
	}
	sum(x: number, y: number) {
		console.log('sum', this.id, this.name)
		return x + y
	}
	saveStorage(obj: { id: string | number; name: string }) {
		console.log('saveStorage', obj)
		localStorage.setItem(this.id.toString(), JSON.stringify(obj))
	}
}
