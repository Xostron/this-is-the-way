const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	// 'https://market.yandex.ru/',
	'https://market.yandex.ru/category/prinadlezhnosti-dlya-moyki-avtomobiley',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 5)
	}
}
