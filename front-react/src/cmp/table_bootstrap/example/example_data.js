const data = {
	// Оглавление таблицы
	thead: [
		{
			parent: [
				{ name: '#' },
				{ name: 'Имя' },
				{ name: 'Январь' },
				{ name: 'Февраль' },
				{ name: 'Март' },
				{ name: 'Апрель' },
				{ name: 'Май' },
				{ name: 'Июнь' },
				{ name: 'Июль' },
				{ name: 'Август' },
				{ name: 'Сентябрь' },
				{ name: 'Октябрь' },
				{ name: 'Ноябрь' },
				{ name: 'Декабрь' },
			],
		},
	],
	// Содержимое таблицы
	tbody: [
		// Главные строки
		{
			// Первая строка
			id: '',
			order: 1,
			parent: [
				// 1 ячейка
				{
					value: 'Брусника', // Имя
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
				// Следующие ячейки
				{ value: 1 },
				{ value: 1 },
				{ value: 1 },
				{ value: 1 },
				{ value: 1 },
				{ value: 1 },
				{ value: 1 },
				{ value: 1 },
			],
			// Скрытые строки
			children: [],
		},
	],
}

export default data
