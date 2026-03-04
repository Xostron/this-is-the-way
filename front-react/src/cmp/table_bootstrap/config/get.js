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

function getSum(row) {
	if (!row?.payment || !Object.keys(row?.payment ?? {}).length) return null
	const value = Object.values(row.payment).reduce((acc, el, i) => {
		if (isNaN(el?.value)) return acc
		acc += Number(el?.value)
		return acc
	}, 0)
	return { value }
}

export { getInfo, getOrder, getSum }
