export type Card = {
	id: number
	name: string
	descr: string
	health: number
	damage: string
}

export type CardChoice = {
	card:Card, owner:string
}

export class CardChoicePower {
	// public static total()
}