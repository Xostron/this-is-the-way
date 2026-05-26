const puppeteer = require('puppeteer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const { collect, save } = require('./fn')
const dsHtml = require('./ds_html')

/**
 * Скачать и сохранить сайт
 * @param {object[]} config Массив конфигов ссылки
 * @param {boolean} mode 	true - режим извлечения ссылок из каталога,
 * 							false - режим скачивания html по ссылке
 */
async function downloadWebsite(config, mode = false) {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
	})
	try {
		// Если нет ссылки - пропускаем
		if (!config.url) throw new Error('Не передан url')
		// Создание папки под ссылку
		if (!fs.existsSync(config.dir)) {
			console.log(1, 'Создаем папку для html', config.dir)
			fs.mkdirSync(config.dir)
		}

		// Открытие страницы
		const page = await browser.newPage()
		await page.setUserAgent(config.userAgent)

		// Ожидание загрузки страницы
		await page.goto(config.url, { waitUntil: 'domcontentloaded', timeout: 60000 })

		await dsHtml(config, page, mode)
		// Поиск и сохранение статических ресурсов
		await collect(page, config, mode)

		console.log(2, '✅ Сайт полностью скачан')
	} catch (err) {
		console.error('Ошибка в основном процессе:', err.message)
	} finally {
		await browser.close()
	}
}

module.exports = downloadWebsite
