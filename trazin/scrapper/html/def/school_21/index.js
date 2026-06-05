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
	// 1. Усиленные аргументы для сокрытия автоматизации
	const browser = await puppeteer.launch({
		headless: false, // Показывать страницу
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-web-security',
			// Убирает флаг navigator.webdriver:
			'--disable-blink-features=AutomationControlled',
			'--window-size=1920,1080',
		],
		// Путь к папке, где Puppeteer сохранит куки и сессию профиля.
		// При втором запуске Ozon посчитает вас доверенным пользователем.
		// userDataDir: path.join(__dirname, '../../oson_user_data'),
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
		// await page.setViewport({ width: 1920, height: 1080 })
		
		// Скрипт-заглушка: дополнительно вырезаем следы автоматизации прямо перед загрузкой страницы
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
		})
		
		
		
		// Ожидание загрузки страницы
		await page.goto(config.url, { waitUntil: 'domcontentloaded', timeout: 60000 })
		// 2. Имитируем поведение человека (ждем прохождения проверки Cloudflare)
		await delay(30000)
		// Скроллим страницу немного вниз, чтобы триггернуть ленивую загрузку данных
		// await page.evaluate(() => window.scrollBy(0, 300))
		// await delay(10000)

		// Получение html товара
		const html = await page.content()

		await save(html, config.ph(`index${idx}.html`))

		console.log('✅ Сайт скачан', `${idx}`)
	} catch (err) {
		console.error('Ошибка в основном процессе:', err.message, err)
	} finally {
		// await browser.close()
	}
}

module.exports = fnHtml
