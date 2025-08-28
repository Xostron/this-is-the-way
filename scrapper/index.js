const http = require('http')
const fs = require('fs')
const path = require('path')

// Сайт для скачивания
// const url = 'http://localhost:4010'
const url = 'http://localhost:4010/img/logoico.svg'
// Путь сохранения сайта
const dir = path.resolve(__dirname, 'front')
const ph = path.resolve(__dirname, 'front', 'index.html')

let result = ''
// Запрос к сайту
const req = http.request(url, (res) => {
	// Получаем чанки
	// res.setEncoding('utf8')
	res.on('data', (chunk) => {
		console.log(111, 'Получили чанк', typeof chunk, chunk)
		result += chunk
	})
	// Конец записи
	res.on('end', () => {
		console.log(222, 'Сайт загружен, начинаем сохранение в html')
		if (!fs.existsSync(dir)) {
			console.log(2221, 'Создаем папку для сайта front')
			fs.mkdirSync(dir)
		}
		fs.writeFileSync(ph, result)
		console.log(333, 'Сохранение завершено')
	})
	// Ощибка
	res.on('error', (err) => console.error(999, err))
})

// req.write(result,(err)=>console.error(err))
req.end()
