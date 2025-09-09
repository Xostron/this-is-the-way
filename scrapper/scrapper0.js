const https = require('https')
const fs = require('fs')
const path = require('path')

const config = {
	// Сайт для скачивания (скачивает только HTML)
	url: 'https://nodejsdev.ru/api/http/#connect',
	// Путь сохранения сайта
	dir: path.resolve(__dirname, 'front'),
	ph: path.resolve(__dirname, 'front', 'index.html'),
}

download(config)

function download({ url, dir, ph }) {
	let result = ''
	// Запрос к сайту
	const req = https.request(url, (res) => {
		// Устанавливаем кодировку считываемых данных
		res.setEncoding('utf8')
		// Считываем данные по чанкам
		res.on('data', (chunk) => {
			console.log(111, 'Получили чанк', chunk.length)
			result += chunk
		})
		// Считывание окончено -> Сохраняем в файл
		res.on('end', () => {
			console.log(222, 'Сайт загружен, начинаем сохранение в html')
			if (!fs.existsSync(dir)) {
				console.log(2221, 'Создаем папку для сайта front')
				fs.mkdirSync(dir)
			}
			fs.writeFileSync(ph, result)
			console.log(333, 'Сохранение завершено')
		})
		// Ошибка
		res.on('error', (err) => console.error(999, err))
	})
	req.end()
}

function save(data, dir, ph) {
	if (!fs.existsSync(dir)) {
		console.log(2221, 'Создаем папку для сайта front')
		fs.mkdirSync(dir)
	}
	fs.writeFileSync(ph, data)
}
