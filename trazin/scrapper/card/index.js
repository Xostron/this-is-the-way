const { delay } = require('../../tool/time')
const save = require('../../tool/save')

/**
 * Поиск ссылок в каталоге и сохранение в cards.json
 * @param {*} page
 */
async function fnCards(page, config) {
	// 1. скроллинг
	console.log('Запуск скроллинга каталога...')
	await autoScroll2(page)
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



async function autoScroll2(page) {
	const duration = 7 * 60 * 1000 
	const startTime = new Date()
	const step = 1000
	const interval = 1000 
	let cur=0
	console.log('Начало', startTime.toLocaleString())
	while (new Date() - startTime < duration) {
		// Выполняем быстрый скролл в браузере
		await page.evaluate(async (dist) => {
			window.scrollTo(0, dist)
		}, cur)

		// Ждем в основном потоке Node.js, не блокируя протокол
		await delay(interval)
		// 3. Проверяем, изменилась ли высота страницы
        const newHeight = await page.evaluate(() => document.body.scrollHeight)
		
		cur = cur + step
		console.log('Прошло', (new Date()-startTime)/60000, 'мин. scroll = ',newHeight, cur )
		await delay(interval)
	}
}

// автоскрол с проверкой окончания ленты товаров
async function autoScroll3(page) {
    const maxDuration = 5 * 60 * 1000; // Максимум 5 минут
    const startTime = Date.now();
    const distance = 400; // Чуть увеличили шаг для уверенного триггера загрузки
    const interval = 600; // Даем сайту 0.6 секунды на подгрузку карточек

    let lastHeight = await page.evaluate(() => document.body.scrollHeight);

    while (Date.now() - startTime < maxDuration) {
        // 1. Скроллим вниз
        await page.evaluate((dist) => {
            window.scrollBy(0, dist);
        }, distance);

        // 2. Ждем подгрузки новых товаров (Lazy Loading / Infinite Scroll)
        await new Promise(resolve => setTimeout(resolve, interval));

        // 3. Проверяем, изменилась ли высота страницы
        const newHeight = await page.evaluate(() => document.body.scrollHeight);
        
        // 4. На всякий случай проверяем, дошли ли до самого низа окна
        const isBottom = await page.evaluate(() => {
            return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
        });

        // Если высота не изменилась и мы в самом низу — товары закончились, выходим
        if (newHeight === lastHeight && isBottom) {
            console.log('Лента полностью загружена. Товары закончились.');
            break;
        }

        lastHeight = newHeight;
    }
}

module.exports = fnCards
