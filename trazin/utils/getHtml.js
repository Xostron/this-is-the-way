const fnConfig = require('../scrapper/config')
const fnHtml = require('../scrapper/html')


// Ссылка
const data = ['https://www.ozon.ru/product/kazan-aprel-3-5l-s-antiprigarnym-pokrytiem-s-kryshkoy-mozhno-myt-v-posudomoechnoy-mashine-1416642575/?at=NOtw8rXxWc3VwP1gs8lvyR1cXyJ4GyS04OykWC2qrnmo']


main()

async function main() {
	const arr = fnConfig(data, '2.html')
	let idx = 0
	for (const el of arr) {
		await fnHtml(el, idx++)
	}
}
