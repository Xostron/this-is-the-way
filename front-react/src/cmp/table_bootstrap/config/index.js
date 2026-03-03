const config = {
	order: ['value'],
	info: ['value', 'count', 'price'],
	payment: ['value', 'dtCoupon'],
}

function getValue(row, idx, type) {
	if (!row || !type) return null
	const r = {}
	config[type].forEach((fld) => (r[fld] = row[fld]))
	return r
}

function getOrder(_, idx) {
	if (isNaN(idx)) return null
	return { value: +idx + 1 }
}

const cfgCells = [
	{
		id: 'order0',
		type: 'order',
		value: '#',
		getValue: getOrder,
	},
	{
		id: 'info1',
		type: 'info',
		value: 'Имя',
		getValue,
	},
	...['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'].map(
		(el, i) => ({
			id: `month${i}`,
			type: `payment`,
			value: el,
			monthId: i,
			getValue,
		}),
	),
]

export default cfgCells
