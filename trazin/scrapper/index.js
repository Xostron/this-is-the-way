const puppeteer = require('puppeteer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const { collect } = require('./fn')

/**
 * Скачать и сохранить сайт
 * @param {*} config Данные для скачивания и сохранения сайта
 */
async function downloadWebsite(config, mode = false) {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
	})
	try {
		if (!config.url) throw new Error('Не передан url')
		if (!fs.existsSync(config.dir)) {
			console.log(1, 'Создаем папку для html', config.dir)
			fs.mkdirSync(config.dir)
		}
		// Открытие страницы
		const page = await browser.newPage()
		await page.setUserAgent(config.userAgent)

		// Оптимизировано: ждем domcontentloaded, чтобы не зависать на рекламе и счетчиках
		await page.goto(config.url, { waitUntil: 'domcontentloaded', timeout: 60000 })

		// Получение html
		const html = await page.content()

		// Сборка ресурсов и сохранение html
		await collect(html, page, config, mode)

		console.log(2, '✅ Сайт полностью скачан')
	} catch (err) {
		console.error('Ошибка в основном процессе:', err.message)
	} finally {
		await browser.close()
	}
}

module.exports = downloadWebsite
