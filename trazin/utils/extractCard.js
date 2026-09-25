const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%B7%D0%B0%D1%80%D1%8F%D0%B4%D0%BD%D0%BE%D0%B5%20%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE%20%D0%B4%D0%BB%D1%8F%20%D0%B0%D0%BA%D0%BA%D1%83%D0%BC%D1%83%D0%BB%D1%8F%D1%82%D0%BE%D1%80%D0%B0%20%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8F&hid=6856242&hid=14946301&rs=eJwzMqpi5di0ZxHzJ0YZDgaBhYdYJRgUQHyFv_MnsGuAWBog1gomEHMv06GHy-wA6cYUxQ%2C%2C&rt=9',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4.5)
	}
}
