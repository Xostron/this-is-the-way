const unirest = require('unirest')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const config = {
	// Сайт для скачивания (скачивает только HTML)
	url: 'https://books.toscrape.com/catalogue/sharp-objects_997/index.html',
	url: 'https://nodejsdev.ru/api/http/',
	// Путь сохранения сайта
	dir: path.resolve(__dirname, 'front'),
	ph: path.resolve(__dirname, 'front', 'index.html'),
}

getData(config)

async function getData(config) {
	try {
		const response = await unirest.get(config.url)
		const $ = cheerio.load(response.body)
		save(response.body, config)
		console.log(333, $('h1').text()) // "Book Title: Sharp Objects"
	} catch (e) {
		console.log(e)
	}
}

function save(data, { dir, ph }) {
	if (!fs.existsSync(dir)) {
		console.log(2221, 'Создаем папку для сайта front')
		fs.mkdirSync(dir)
	}
	fs.writeFileSync(ph, data)
}
