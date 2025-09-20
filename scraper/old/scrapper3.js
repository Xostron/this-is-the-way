const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const config = {
	// Сайт для скачивания (скачивает только HTML)
	url: 'https://habr.com/ru/companies/clevertec/articles/877682/',
	url: 'https://muzofond.fm/',
	// Путь сохранения сайта
	dir: path.resolve(__dirname, 'front1'),
	ph: (filename) => path.resolve(__dirname, 'front1', filename),
}

scrapeAndSave(config)

async function scrapeAndSave(config) {
	const browser = await puppeteer.launch({ headless: true })
	try {
		const page = await browser.newPage()
		await page.goto(config.url, { waitUntil: 'networkidle2' })
		// Сбор данных
		const data = await page.evaluate(() => {
			return {
				title: document.title,
				url: window.location.href,
				text: document.body.innerText,
				links: Array.from(document.querySelectorAll('a[href]')).map((a) => a.href),
				images: Array.from(document.querySelectorAll('img[src]')).map((img) => img.src),
			}
		})
		// Сохранение в JSON
		save(JSON.stringify(data, null, 2), config.dir, config.ph('data.json'))
		// Сохранение HTML
		const html = await page.content()
		save(html, config.dir, config.ph('index.html'))

		// Скриншот
		await page.screenshot({ path: config.ph('screenshot.png'), fullPage: true })

		console.log(`✅ Данные сохранены в ${config.dir}.*`)
	} finally {
		await browser.close()
	}
}

function save(data, dir, filename) {
	if (!fs.existsSync(dir)) {
		console.log(2221, 'Создаем папку для сайта front')
		fs.mkdirSync(dir)
	}
	fs.writeFileSync(filename, data)
}
