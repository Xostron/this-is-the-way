

const data = {
	// Оглавление таблицы
	thead: [
		{ value: '#' },
		{ value: 'Имя' },
		{ value: 'Январь' },
		{ value: 'Февраль' },
		{ value: 'Март' },
		{ value: 'Апрель' },
		{ value: 'Май' },
		{ value: 'Июнь' },
		{ value: 'Июль' },
		{ value: 'Август' },
		{ value: 'Сентябрь' },
		{ value: 'Октябрь' },
		{ value: 'Ноябрь' },
		{ value: 'Декабрь' },
	],
	// Содержимое таблицы - строки
	tbody: [
		{
			// Первая строка - ОФЗ
			id: 'уникальный ИД',
			order: 1, // Порядок сортировки
			// Главная строка parent
			parent: [
				// Ячейки, каждая ячейка может иметь один или несколько полей
				{ value: 1 },
				{
					value: 'ОФЗ 29027', // Имя
					price: 945, // Текущая цена
					count: 18, // Количество
					coupon: 39, // Купон
					par: 0, // Номинал
					term: {
						duration: '', // Срок
						from: '', // Начало
						to: '', // Конец
					},
				},
				// Следующие ячейки
				{ value: 1, dtCoup: '17.01.2025' },
				{ value: 1 },
				{ value: 1 },
				{ value: 1, dtCoup: '17.04.2025' },
				{ value: 1 },
				{ value: 1 },
				{ value: 1, dtCoup: '17.07.2025' },
				{ value: 1 },
				{ value: 1 },
				{ value: 1, dtCoup: '17.10.2025' },
				{ value: 1 },
				{ value: 1 },
			],
			// Вложенные строки
			children: [],
		},
		{
			// Вторая строка - ВДО
			id: '',
			order: 2,
			parent: [
				{ value: 1 },
				{
					value: 'Софтлайн', // Имя
					price: 0, // Текущая цена
					count: 0, // Количество
					coupon: 0, // Купон
					dtCoupon: '', // Дата купана
					par: 0, // Номинал
					term: {
						duration: '', // Срок
						from: '', // Начало
						to: '', // Конец
					},
				},
				{ value: 1, dtCoup: '08.01.2025' },
				{ value: 1, dtCoup: '08.02.2025' },
				{ value: 1, dtCoup: '08.03.2025' },
				{ value: 1, dtCoup: '08.04.2025' },
				{ value: 1, dtCoup: '08.05.2025' },
				{ value: 1, dtCoup: '08.06.2025' },
				{ value: 1, dtCoup: '08.07.2025' },
				{ value: 1, dtCoup: '08.08.2025' },
				{ value: 1, dtCoup: '08.09.2025' },
				{ value: 1, dtCoup: '08.10.2025' },
				{ value: 1, dtCoup: '08.11.2025' },
				{ value: 1, dtCoup: '08.12.2025' },
			],
			children: [],
		},
		{
			// Третья строка - ФОНДЫ
			id: '',
			order: 3,
			parent: [
				{ value: 1 },
				// 1 ячейка
				{
					value: 'TGOLD', // Имя
					price: 15, // Текущая цена
					count: 30, // Количество
				},
				// Следующие ячейки
				{ value: null },
				{ value: null },
				{ value: null },
				{ value: null },
				{ value: null },
				{ value: null },
				{ value: null },
				{ value: null },
				{ value: null },
				{ value: null },
				{ value: null },
				{ value: null },
			],
			// Вложенные строки
			children: [
				{
					id: '',
					order: 3,
					parent: [
						{ value: 1 },
						// 1 ячейка
						{
							value: 'ВИМ', // Имя
							price: 1.92, // Текущая цена
							count: 300, // Количество
						},
						// Следующие ячейки
						{ value: null },
						{ value: null },
						{ value: null },
						{ value: null },
						{ value: null },
						{ value: null },
						{ value: null },
						{ value: null },
						{ value: null },
						{ value: null },
						{ value: null },
						{ value: null },
					],
				},
			],
		},
	],
}

export default data
