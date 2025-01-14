export type Prd = {
	id: number
	name: string
	desc: string
	category: string
	price: number
}

export type PrdSel = {
	product: Prd
	count: number
}

export class PrdSelHelp {
	// Стоимость всех продуктов
	public static total(selections: PrdSel[]) {
		return selections.reduce((acc, item, i) => acc + item.product.price * item.count, 0)
	}
	// Количество продуктов
	public static productCount(selections: PrdSel[]) {
		return selections.reduce((acc, item, i) => acc + item.count, 0)
	}
}

export class PrdSelMut {
	// Добавить продукт
	public static addPrd(selections: PrdSel[], prd: Prd, count: number) {}
	// Убрать продукт
	public static removePrd(selections: PrdSel[], id: number) {
		selections.forEach((el, i) => {
			if (el.product.id === i) {
				selections = selections.splice(i, 1)
			}
		})
	}
}

// export type { Prd, PrdSel }
// export { PrdSelHelp, PrdSelMut }
