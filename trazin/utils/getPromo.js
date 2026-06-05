// const data = require('./data')
const fnConfig = require('../scrapper/config')
const { fnPromo } = require('../scrapper')
const save = require('../tool/save')
const { delay } = require('../tool/time')
const data = [
  require('../temp_cards/cards_0.json'),
    require('../temp_cards/cards_1.json'),
      require('../temp_cards/cards_2.json'),
      require('../temp_cards/cards_3.json'),
      require('../temp_cards/cards_4.json'),
      require('../temp_cards/cards_5.json'),
      require('../temp_cards/cards_6.json'),
      require('../temp_cards/cards_7.json'),
      require('../temp_cards/cards_8.json'),
      require('../temp_cards/cards_9.json'),
]
// ссылки на товары
;(async function main() {
	for (let i = 0; i < data.length; i++) {
		await getPromo(data[i], i)
	}
})()

// Выполнение скачивание html
async function getPromo(arr, idx) {
	// Ссылки карточки товаров
	let arrCfg = fnConfig(arr)

	// Разбиение на ча...............нки
	arrCfg = fnChunk(arrCfg)

	let i = 0
	const result = []

	// Обработка чанков
	for (const chunk of arrCfg) {
		try {
			// анализ html извлечение ссылок промокодов
			const r = await Promise.all(chunk.map((el) => fnPromo(el)))

			//Только уникальные ссылки
			result.push(...new Set(r.flat()))
			console.log('Порция', ++i, 'из', arrCfg.length, 'завершена')
			// Задержка чтобы не забивать процессор
			await delay(150)
		} catch (error) {
			console.log(error)
		}
	}

	// Сохраняем все собранные ссылки в один файл
	await save(
		JSON.stringify({ ...[...new Set(result)] }, null, ' '),
		arrCfg[0][0].ph(`index_${idx}.json`),
	)
}

// Массив -> массив с подмассивами чанков из 10 элементов
function fnChunk(arr) {
	const r = []
	const rr = []
	arr.forEach((el, i) => {
		// Порция из 3 или последний э=т массива
		rr.push(el)
		if (rr.length >= 3 || i >= arr.length - 1) {
			r.push([...rr])
			rr.length = 0
		}
	})
	return r
}
