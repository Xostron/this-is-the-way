const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const config = {
	// Сайт для скачивания (скачивает только HTML)
	// url: 'https://habr.com/ru/companies/clevertec/articles/877682/',
	url: 'https://muzofond.fm/',
	// Путь сохранения сайта
	dir: path.resolve(__dirname, 'front_temp'),
	ph: (filename) => path.resolve(__dirname, 'front_temp', filename),
}

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
	if (!fs.existsSync(config.dir)) {
		console.log(2221, 'Создаем папку для сайта front', config.dir)
		fs.mkdirSync(config.dir)
	}
	try {
		const page = await browser.newPage()

		// Переход на страницу
		await page.goto(config.url, {
			waitUntil: 'networkidle2',
			timeout: 30000,
		})

		// Получение всех ресурсов
		const resources = await page.evaluate(() => {
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

		// Скачивание HTML
		const html = await page.content()
		save(html, config.ph('index.html'))
		console.log('✅ HTML сохранен')
		save(JSON.stringify(resources, null, ' '), config.ph('resource.json'))
		// Скачивание всех ресурсов
		for (const resource of resources) {
			try {
				const response = await page.goto(resource.url, {
					waitUntil: 'domcontentloaded',
				})
				if (response && response.ok()) {
					const buffer = await response.buffer()
					const fileName = path.basename(new URL(resource.url).pathname)
					const filePath = path.join(config.dir, fileName)

					save(buffer, filePath)
					console.log(`✅ Скачан: ${fileName}`)
				}
			} catch (error) {
				console.error(`❌ Ошибка скачивания ${resource.url}:`, error.message)
			}
		}

		console.log('✅ Сайт полностью скачан')
	} finally {
		await browser.close()
	}
}

function save(data, filename) {
	fs.writeFileSync(filename, data)
}
