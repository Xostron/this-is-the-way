/**
 * Рама строк
 * config - какие поля брать у ячейки типа order,info, payment
 * 
 * getOrder, getInfo - функции возвращающие объект со 
 * значениями полей согласно config
 * 
 * cfgCells - конфигураяция строки и рама ячейки - определяет наполнение ячейки 
 */

const config = {
	order: ['value'],
	info: ['value', 'count', 'price'],
	payment: ['value', 'dtCoupon'],
}
/**
 *
 * @param {*} row данные ячейки (мясо)
 * @param {*} idx Порядковый номер строки
 * @param {*} type Тип ячейки (рама)
 * @returns
 */
function getInfo(row, cfg) {
	if (!row) return null
	const r = {}
	config[cfg.type].forEach((fld) => (r[fld] = row[fld]))
	return r
}

function getOrder(_, __, orderRow) {
	if (isNaN(orderRow)) return null
	return { value: +orderRow + 1 }
}

const cfgCells = [
	{
		id: 0,
		type: 'order',
		value: '#',
		getValue: getOrder,
	},
	{
		id: 1,
		type: 'info',
		value: 'Имя',
		getValue: getInfo,
	},
	...['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'].map((el, i) => ({
		id: 2 + i,
		type: 'payment',
		value: el,
		monthId: i,
		getValue: getInfo,
	})),
]

export default cfgCells
