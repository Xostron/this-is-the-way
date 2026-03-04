import { getInfo, getOrder, getSum } from './get'

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
	...['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'].map(
		(el, i) => ({
			id: 10 + i,
			type: 'payment',
			value: el,
			monthId: i,
			getValue: getInfo,
		}),
	),

	{
		id: 2,
		type: 'calcSum',
		value: 'За год',
		getValue: getSum,
	},
]

export default cfgCells
