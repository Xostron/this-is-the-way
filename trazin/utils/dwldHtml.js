// const data = require('./data')
const downloadWebsite = require('../scrapper')
const fnConfig = require('../scrapper/config')
const data = require('../temp_cards/cards.json')
const { delay } = require('../tool/index')
// ссылки на товары

main()

// Выполнение скачивание html
async function main() {
	let arr = fnConfig(data)
	// Разбиение на чанки
	arr = collect(arr)
	let i = 0
	// Обработка чанков
	for (const chunk of arr) {
		// анализ html извлечение ссылок промокодов
		await Promise.all(chunk.map((el) => downloadWebsite(el)))
		console.log('Порция', ++i, 'из', arr.length)
		delay(300)
	}
}

// Массив -> массив с подмассивами чанков из 10 элементов
function collect(arr) {
	const r = []
	const rr = []
	arr.forEach((el, i) => {
		// Порция из 10 или последний э=т массива
		rr.push(el)
		if (rr.length >= 10 || i >= arr.length - 1) {
			r.push([...rr])
			rr.length = 0
		}
	})
	return r
}
