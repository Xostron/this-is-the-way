const save = require('./save')

/**
 * Поиск ссылок в каталоге и сохранение в cards.json
 * @param {*} page
 */
async function fnCards(page, config) {
	// 1. скроллинг
	console.log('Запуск скроллинга каталога...')
	await autoScroll(page)
	// 2. поиск карточек товара
	console.log('Скроллинг завершен. Сбор ссылок...')
	const cards = await page.evaluate(() => {
		// Находим все ссылки, у которых href начинается с '/card/'
		const anchors = document.querySelectorAll('a[href^="/card/"]')

		return Array.from(anchors)
			.map((anchor) => anchor.href) // Автоматически превратит относительный URL в полный
			.filter((url, index, self) => self.indexOf(url) === index) // Удалит дубликаты
	})
	// 3. сохранение в cards.json
	console.log(`Найдено уникальных карточек: ${cards.length}`)
	await save(JSON.stringify(cards, null, ' '), config.ph('cards.json'))
}

async function autoScroll(page) {
	await page.evaluate(async () => {
		await new Promise((resolve) => {
			const distance = 300 // Увеличили шаг, чтобы скроллить быстрее
			const duration = 2.5 * 60 * 1000 // 1 минута в миллисекундах
			const startTime = Date.now()

			const timer = setInterval(() => {
				window.scrollBy(0, distance)
				const t = Date.now() - startTime
				// Проверяем, прошло ли 2 минуты
				if (t >= duration) {
					clearInterval(timer)
					resolve()
				}
			}, 1000) // Интервал между скроллами
		})
	})
}

module.exports = fnCards
