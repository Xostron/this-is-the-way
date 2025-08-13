import { useEffect } from 'react'

export default function OOP() {
	const obj1 = new (Alpha as any)(12, 'Ingo Peck')
	console.log(111, obj1)
	useEffect(() => {}, [])
	return <main>Прототипы</main>
}

interface IAlpha {
	id: string | number
	name: string
	help?: () => void
	action?: any
}

function Alpha1(this: IAlpha, id: string | number, name: string): void {
	this.id = id
	this.name = name
	this.help = () => {
		console.log(this.name)
	}
}
class Alpha {
	id: string | number
	name: string
	action: any
	constructor(id: string | number, name: string) {
		this.id = id
		this.name = name
	}
}
Alpha.prototype.action = function () {
	console.log(this.id)
}
