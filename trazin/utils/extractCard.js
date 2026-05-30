const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%B1%D1%8B%D1%82%D0%BE%D0%B2%D0%B0%D1%8F%20%D1%85%D0%B8%D0%BC%D0%B8%D1%8F&hid=13041507&hid=90688&hid=90691&hid=13041431&hid=13041430&hid=16879916&hid=13196790&rs=eJwzyqli5Xj8bzbbJ0YvDgaBhYdYJRgUQHyFA0dYFQ4D8XQQZxqIWLOojUPh2-6lbBogBRogMQ2gKg2gKg2QKg2wHEjVX8YPLb_39TJ19bPbT2Xiu_7TbgUTSA8AEFkw4Q%2C%2C&rt=9',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
