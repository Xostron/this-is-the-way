const fnConfig = require('../scrapper/config')
const fnHtml = require('../scrapper/html')


// Ссылка
const data = ['https://www.ozon.ru/product/frantsuz-kreslo-beskarkasnoe-s-podushkoy-dlya-doma-i-otdyha-formula-290-1040787373/?at=k2toRJG5VFnByYLxiQzBmqgH8EM0RZsND8KB3T0XZG5G']


main()

async function main() {
	const arr = fnConfig(data)
	let idx = 0
	for (const el of arr) {
		await fnHtml(el, idx++)
	}
}
