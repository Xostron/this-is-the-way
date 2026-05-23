const puppeteer = require('puppeteer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

const dirPath = process.argv[5] ?? 'temp'

const config = {
	url: process.argv[3] ?? 'https://muzofond.fm',
	dir: path.resolve(__dirname, dirPath),
	ph: (filename) => path.resolve(__dirname, dirPath, filename),
}

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

downloadWebsite(config)

/**************************************************************************************** */
/**
 * Скачать и сохранить сайт
 * @param {*} config Данные для скачивания и сохранения сайта
 */
async function downloadWebsite(config) {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
	})
	try {
		if (!config.url) throw new Error('Не передан url')
		if (!fs.existsSync(config.dir)) {
			console.log(3, 'Создаем папку куда сохраним сайт', config.dir)
			fs.mkdirSync(config.dir)
		}
		const page = await browser.newPage()
		await page.setUserAgent(userAgent)

		// Оптимизировано: ждем domcontentloaded, чтобы не зависать на рекламе и счетчиках
		await page.goto(config.url, { waitUntil: 'domcontentloaded', timeout: 60000 })

		let html = await page.content()

		await collect(html, page, config)
		console.log('✅ Сайт полностью скачан')
	} catch (err) {
		console.error('Ошибка в основном процессе:', err.message)
	} finally {
		await browser.close()
	}
}

/**
 * Сбор и сохранение ресурсов (статика) + переписываем пути статики в html
 * @param {string} html Содержимое html страницы
 * @param {Object} page Страница
 * @param {Object} config Конфигурация
 */
async function collect(html, page, config) {
	// const resources = await page.evaluate(() => {
	// 	const r = []
	// 	document.querySelectorAll('script[src]').forEach((script) => {
	// 		r.push({
	// 			url: new URL(script.src, window.location.href).href,
	// 			type: 'js',
	// 			href: script.src,
	// 		})
	// 	})
	// 	return r
	// })

	await save(html, config.ph('index.html'))
	console.log('✅ HTML сохранен')
	await save(JSON.stringify(resources, null, ' '), config.ph('resource.json'))

	// Оптимизировано: скачиваем через fetch вместо тяжелого page.goto()
	// 	for (const resource of resources) {
	// 		try {
	// 			const res = await fetch(resource.url, {
	// 				headers: { 'User-Agent': userAgent }
	// 			})

	// 			if (res.ok) {
	// 				const arrayBuffer = await res.arrayBuffer()
	// 				const buffer = Buffer.from(arrayBuffer)

	// 				const urlObj = new URL(resource.url)
	// 				let fileName = path.basename(urlObj.pathname)

	// 				if (!fileName) {
	// 					fileName = `script_${Math.random().toString(36).substring(2, 7)}.js`
	// 				}

	// 				const filePath = path.join(config.dir, fileName)
	// 				await save(buffer, filePath)
	// 				console.log(`✅ Скачан: ${fileName}`)
	// 			} else {
	// 				console.error(`❌ Ошибка сервера ${res.status} для ${resource.url}`)
	// 			}
	// 		} catch (error) {
	// 			console.error(`❌ Ошибка скачивания ${resource.url}:`, error.message)
	// 		}
	// 	}
}

// сохранение файла
async function save(data, filename) {
	await fsp.writeFile(filename, data)
}
