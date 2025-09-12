const puppeteer = require('puppeteer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

const config = {
	// Сайт для скачивания (скачивает только HTML)
	// url: 'https://habr.com/ru/companies/clevertec/articles/877682/',
	// url: 'https://muzofond.fm/',
	// url: 'http://localhost:4010/building/6800b88d56c6a01c90ecbc5e',
	url: process.argv[3],
	keyword: process.argv[5] ?? '',
	// Путь сохранения сайта
	dir: path.resolve(__dirname, 'front_temp'),
	ph: (filename) => path.resolve(__dirname, 'front_temp', filename),
}
console.log(112, config.url)
console.log(113, config.keyword)
downloadWebsite(config)

async function downloadWebsite(config) {
	const browser = await puppeteer.launch({
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--single-process', // опционально, для легковесных сред
		],
	})
	try {
		if (!config.url) throw new Error('Не передан url', config.url)
		if (!fs.existsSync(config.dir)) {
			console.log(2221, 'Создаем папку для сайта front', config.dir)
			fs.mkdirSync(config.dir)
		}
		const page = await browser.newPage()

		// Переход на страницу
		await page.goto(config.url, { waitUntil: 'networkidle2', timeout: 30000 })

		// Сбор и сохранение ресурсов (статика)
		await collect(page)

		// Скачивание HTML
		const html = await page.content()

		await save(html, config.ph('index.html'))
		console.log('✅ HTML сохранен')
		console.log('✅ Сайт полностью скачан')
	} catch (err) {
		console.log(err)
		await browser.close()
	} finally {
		await browser.close()
	}
}

// Сбор и сохранение ресурсов (статика)
async function collect(page) {
	const result = await page.evaluate(() => {
		const resources = []
		// Собираем все ссылки на CSS
		document.querySelectorAll('link[rel="stylesheet"][href]').forEach((link) => {
			resources.push({
				url: new URL(link.href, window.location.href).href,
				type: 'css',
			})
		})
		// Собираем все скрипты
		document.querySelectorAll('script[src]').forEach((script) => {
			resources.push({
				url: new URL(script.src, window.location.href).href,
				type: 'js',
			})
		})
		// Собираем все изображения
		document.querySelectorAll('img[src]').forEach((img) => {
			resources.push({
				url: new URL(img.src, window.location.href).href,
				type: 'image',
			})
		})
		// Собираем шрифты
		document
			.querySelectorAll('link[rel="preload"][as="font"], link[rel="stylesheet"]')
			.forEach((link) => {
				if (link.href) {
					resources.push({
						url: new URL(link.href, window.location.href).href,
						type: 'font',
					})
				}
			})
		return resources
	})
	await save(JSON.stringify(result, null, ' '), config.ph('resource.json'))
	// Скачивание и сохранение всех ресурсов
	for (const resource of result) {
		try {
			const response = await page.goto(resource.url, { waitUntil: 'domcontentloaded' })
			if (response && response.ok()) {
				const buffer = await response.buffer()
				const fileName = path.basename(new URL(resource.url).pathname)
				const filePath = path.join(config.dir, fileName)
				await save(buffer, filePath)
				console.log(`✅ Скачан: ${fileName}`)
			}
		} catch (error) {
			console.error(`❌ Ошибка скачивания ${resource.url}:`, error.message)
		}
	}
}
// сохранение файла
async function save(data, filename) {
	await fsp.writeFile(filename, data)
}

// 
function autoreplace(html, keyword) {
	if (!keyword) return html
	const dict = ['<title', '<h1', '<p', '<span', '<li', '<alt']
	
	return html
}
