require('module-alias/register')
const readline = require('readline')
const path = require('path')
const fs = require('fs')

convertLogToObjectsFile(
	path.join(__dirname, 'log', 's1.log'),
	path.join(__dirname, 'log', 'sss1.json'),
)
// Стриминговое чтение лога и пстриминговая перезапись в json
async function convertLogToObjectsFile(inputFilename, outputFilename) {
	// 1. Открываем поток чтения сырого лога
	const fileStream = fs.createReadStream(inputFilename, { encoding: 'utf8' })
	const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

	// 2. Открываем поток ЗАПИСИ в новый файл
	const writeStream = fs.createWriteStream(outputFilename, { encoding: 'utf8' })
	writeStream.write('[\n')
	let count = 0
	let isFirst = true
	console.log(`Старт обработки файла: ${inputFilename}...`)

	// 3. Читаем строку -> парсим -> пишем в новый файл
	for await (const line of rl) {
		if (!line.trim()) continue // Пропускаем пустые строки

		try {
			// Превращаем строку в полноценный JS-объект
			const row = JSON.parse(line)

			// Модифицируем объект как нам нужно (например, достаем message из Winston)
			if (row.message) {
				const cleanObject = {
					type: row.message.type,
					value: row.message.value,
					timestamp: row.timestamp,
					mode: 'хранение',
				}
				
				// 2. СТРИМИНГОВАЯ МАГИЯ С ЗАПЯТЫМИ
				!isFirst
					? // Если объект НЕ первый, сначала ставим запятую к предыдущей строке
						writeStream.write(',')
					: // Первый объект прошел без запятой перед ним
						(isFirst = false)
				// Записываем объект в новый файл, превращая обратно в строку + перенос строки
				// Метод .write() отправляет данные в буфер записи асинхронно
				writeStream.write(JSON.stringify(cleanObject) + '\n')
				count++
			}
		} catch (err) {
			// Если строка битая, не падаем, а идем дальше
			console.warn('Пропущена поврежденная строка')
		}
	}

	// 4. ОБЯЗАТЕЛЬНО: Закрываем поток записи, когда цикл завершен
	writeStream.write(']\n')
	writeStream.end()

	console.log(`🏁 Обработка завершена! Успешно перезаписано объектов: ${count}`)
	console.log(`Результат сохранен в: ${outputFilename}`)
}