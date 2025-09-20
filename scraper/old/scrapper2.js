const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const config = {
	// Путь сохранения сайта
	dir: path.resolve(__dirname, 'front'),
	ph: path.resolve(__dirname, 'front', 'index.html'),
}

get(config)

async function get(config) {
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()
	console.log(111, page)
	const pageGoto = await page.goto('https://books.toscrape.com/index.html', {
		waitUntil: 'domcontentloaded',
	})
	console.log(222, pageGoto)
	const data = await page.evaluate(() => {
		console.log(333, document)
		return Array.from(document.querySelectorAll('article h3')).map((el) => {
			return {
				title: el.querySelector('a').getAttribute('title'),
				link: el.querySelector('a').getAttribute('href'),
			}
		})
	})
	console.log(444, data)

	await browser.close()
	save('scrapp', config)
}

function save(data, { dir, ph }) {
	if (!fs.existsSync(dir)) {
		console.log(2221, 'Создаем папку для сайта front')
		fs.mkdirSync(dir)
	}
	fs.writeFileSync(ph, data)
}
