// Строки
const data = [
	{
		// Первая строка - ОФЗ
		id: 'уникальный ИД',
		order: 1, // Порядок сортировки
		value: 'ОФЗ 29027', // Имя
		price: 945, // Текущая цена
		count: 18, // Количество
		coupon: 39, // Купон
		par: 0, // Номинал
		duration: '', // Срок
		from: '', // Начало
		to: '', // Конец
		payment: [
			// Следующие ячейки
			{ order: 0, value: 1, dtCoup: '17.01.2025' },
			{ order: 3, value: 10, dtCoup: '17.04.2025' },
			{ order: 6, value: 100, dtCoup: '17.07.2025' },
			{ order: 9, value: 1000, dtCoup: '17.10.2025' },
		],
	},
	{
		// Вторая строка - ВДО
		id: '',
		order: 2,
		value: 'Софтлайн', // Имя
		price: 0, // Текущая цена
		count: 0, // Количество
		coupon: 0, // Купон
		dtCoupon: '', // Дата купана
		par: 0, // Номинал
		duration: '', // Срок
		from: '', // Начало
		to: '', // Конец

		payment: [
			{ order: 0, value: 1, dtCoup: '08.01.2025' },
			{ order: 1, value: 1, dtCoup: '08.02.2025' },
			{ order: 2, value: 1, dtCoup: '08.03.2025' },
			{ order: 3, value: 1, dtCoup: '08.04.2025' },
			{ order: 4, value: 1, dtCoup: '08.05.2025' },
			{ order: 5, value: 1, dtCoup: '08.06.2025' },
			{ order: 6, value: 1, dtCoup: '08.07.2025' },
			{ order: 7, value: 1, dtCoup: '08.08.2025' },
			{ order: 8, value: 1, dtCoup: '08.09.2025' },
			{ order: 9, value: 1, dtCoup: '08.10.2025' },
			{ order: 10, value: 1, dtCoup: '08.11.2025' },
			{ order: 11, value: 1, dtCoup: '08.12.2025' },
		],
		children: [],
	},
	{
		// Третья строка - ФОНДЫ
		id: '',
		order: 3,
		value: 'TGOLD', // Имя
		price: 15, // Текущая цена
		count: 30, // Количество
		payment: [],
		// Вложенные строки
		children: [
			{
				// Третья строка - ФОНДЫ
				id: '',
				order: 3,

				value: 'ВИМ', // Имя
				price: 1.92, // Текущая цена
				count: 300, // Количество
			},
		],
	},
]

export default data
