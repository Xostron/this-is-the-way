import { Primarch } from "./types"

const prm = [
	new Primarch(6, "Леман Русс"),
	new Primarch(20, "Альфарий"),
	new Primarch(1, "Лев Эль Джонсон")
]
type shapeType = { name: string }


/**
 * Обощенный тип <T> позволяет подключить разные типы к классу Collection,
 * <T extends shapeType> ограничивает обощенный тип - дает указание чтобы подключаемые типы имели свойство name
 */
class Collection<T extends shapeType> {
	constructor(public items: T[] = []) {}
	get(name: string): T {
		return this.items.find((el) => el.name === name)
	}
}

const c :Collection<Primarch>= new Collection(prm)
console.log(c.get('Альфарий'))