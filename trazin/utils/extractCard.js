const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	// 'https://market.yandex.ru/search?text=%D1%80%D1%83%D0%B1%D0%B0%D1%88%D0%BA%D0%B8&hid=53546043&hid=52710858&hid=53546173&rs=eJwz8q5i5dg944jkC0bGT4xqHAwCCw-xSjAogIQUTs2eKKmwd-YRSQ0QVwPE1QBx_zIyAEEvE4icCiZXMIFUAAAccxmK&rt=9',
	'https://market.yandex.ru/catalog--ruchnoi-stroitelnyi-instrument-v-volzhskom/56346/list?hid=91625&rs=eJwzmsf4iXEWIweDwMJDrBIMCi9Ps2osbdvApPFm52V2jZ99H9g0fs16wa4x9dR-do25_wU0zrev4NB4DVT1aPNVdo3pQJF3QM4HIH5-YjmHxuLlhzk0XgF5t37vZdf48PgDq8ayU2fYNGbuB-lvX8Gu8RYk9uvjEXaNN0BlsxZeY9U4vv8Cm8aON9dZNe5tAZr-7-VXdo0vIPsPHmcFANldTCc%2C',
	// 'https://market.yandex.ru/category/prinadlezhnosti-dlya-moyki-avtomobiley',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 5)
	}
}
