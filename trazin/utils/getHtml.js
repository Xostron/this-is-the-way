const fnConfig = require('../scrapper/config')
const fnHtml = require('../scrapper/html')


// Ссылка
const data = ['https://www.wildberries.ru/lk/basket']


main()

async function main() {
	const arr = fnConfig(data, '2.html')
	let idx = 0
	for (const el of arr) {
		await fnHtml(el, idx++)
	}
}
