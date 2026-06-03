const puppeteer = require('puppeteer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const dsHtmlPromo = require('./promo')
const fnCards = require('./card/index')

/**
 * Поиск в html карточки товара ссылок на промокоды
 * @param {object[]} config Массив конфигов ссылки
 */
async function fnPromo(config) {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
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
		await page.setUserAgent(config.userAgent)

		// Ожидание загрузки страницы
		await page.goto(config.url, { waitUntil: 'domcontentloaded', timeout: 60000 })

		const r = await dsHtmlPromo(config, page)
		console.log('✅ Карточка пройдена, извлечено ссылок', r.length)
		return r
	} catch (err) {
		console.error('Ошибка в основном процессе:', err.message, err)
	} finally {
		await browser.close()
	}
}

/**
 * Извлечь из html ссылки на карточки товаров
 * @param {object[]} config Массив конфигов ссылки
 */
async function fnUrlCards(config,tt) {
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
		// Устанавливаем размер экрана (несовпадение размеров часто выдает бота)
		await page.setViewport({ width: 1920, height: 1080 })
		// Ожидание загрузки страницы
		await page.goto(config.url, { waitUntil: 'domcontentloaded', timeout: 60000 })

		// Поиск и сохранение ссылок на товары
		await fnCards(page, config, tt)
		console.log('✅ Извлечение карточек товаров завершено')
	} catch (err) {
		console.error('Ошибка в основном процессе:', err.message)
	} finally {
		await browser.close()
	}
}

module.exports = { fnPromo, fnUrlCards }
