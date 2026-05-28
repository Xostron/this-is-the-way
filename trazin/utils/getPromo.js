// const data = require('./data')
const fnConfig = require('../scrapper/config')
const save = require('../scrapper/save')
const { delay } = require('../tool/index')
const { fnPromo } = require('../scrapper')
const data = require('../temp_cards/tools2.json')
// ссылки на товары

main()

// Выполнение скачивание html
async function main() {
	// Ссылки карточки товаров
	let arrCfg = fnConfig(data)

	// Разбиение на ча...............нки
	arrCfg = fnChunk(arrCfg)

	let i = 0
	const result = []

	// Обработка чанков
	for (const chunk of arrCfg) {
		// анализ html извлечение ссылок промокодов
		const r = await Promise.all(chunk.map((el) => fnPromo(el)))

		//Только уникальные ссылки
		result.push(...new Set(r.flat()))
		console.log('Порция', ++i, 'из', arrCfg.length, 'завершена')
		// Задержка чтобы не забивать процессор
		await delay(150)
	}

	// Сохраняем все собранные ссылки в один файл
	await save(JSON.stringify({...[...new Set(result)]}, null, ' '), arrCfg[0][0].ph(`index.json`))
}

// Массив -> массив с подмассивами чанков из 10 элементов
function fnChunk(arr) {
	const r = []
	const rr = []
	arr.forEach((el, i) => {
		// Порция из 10 или последний э=т массива
		rr.push(el)
		if (rr.length >= 5 || i >= arr.length - 1) {
			r.push([...rr])
			rr.length = 0
		}
	})
	return r
}
