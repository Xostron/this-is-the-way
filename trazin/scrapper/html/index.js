const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
// const puppeteer = require('puppeteer')
const save = require('../../tool/save')
const { delay } = require('../../tool/time')

puppeteer.use(StealthPlugin())

/**
 * Поиск в html карточки товара ссылок на промокоды
 * @param {object[]} config Массив конфигов ссылки
 */
async function fnHtml(config, idx) {
	// const browser = await puppeteer.launch({
	// 	headless: false,
	// 	args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
	// })
	// 1. Усиленные аргументы для сокрытия автоматизации
	const browser = await puppeteer.launch({
		headless: false, // Для OZON строго false (headful режим)
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-web-security',
			// Убирает флаг navigator.webdriver:
			'--disable-blink-features=AutomationControlled',
			'--window-size=1920,1080',
		],
		// Игнорируем ошибки сертификатов, которые могут вызывать прокси
		ignoreHTTPSErrors: true,
	})

	try {
		// Если нет ссылки - пропускаем
		if (!config.url) throw new Error('Не передан url')
		// Создание папки под ссылку
		if (!fs.existsSync(config.dir)) {
			console.log('Создаем папку для промокодов', config.dir)
			fs.mkdirSync(config.dir)
		}

		// Открытие страницы
		const page = await browser.newPage()
		// Устанавливаем размер экрана (несовпадение размеров часто выдает бота)
		await page.setViewport({ width: 1920, height: 1080 })

		// await page.setUserAgent(config.userAgent)

		// // Дополнительная маскировка через заголовки
		// await page.setExtraHTTPHeaders({
		// 	'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
		// 	'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
		// 	'sec-ch-ua-mobile': '?0',
		// 	'sec-ch-ua-platform': '"Windows"',
		// })

		// Скрипт-заглушка: дополнительно вырезаем следы автоматизации прямо перед загрузкой страницы
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
		})

		// Ожидание загрузки страницы
		await page.goto(config.url, { waitUntil: 'domcontentloaded', timeout: 60000 })

		// 2. Имитируем поведение человека (ждем прохождения проверки Cloudflare)
		await delay(5000)

		// Скроллим страницу немного вниз, чтобы триггернуть ленивую загрузку данных
		await page.evaluate(() => window.scrollBy(0, 300))
		await delay(3000)

		// Получение html товара
		const html = await page.content()

		await save(html, config.ph(`index${idx}.html`))
		console.log('✅ Сайт скачан', idx)
	} catch (err) {
		console.error('Ошибка в основном процессе:', err.message, err)
	} finally {
		await browser.close()
	}
}

module.exports = fnHtml
