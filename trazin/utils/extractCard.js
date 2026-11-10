const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%B2%D0%B8%D1%82%D0%B0%D0%BC%D0%B8%D0%BD%D1%8B%20%D0%B4%D0%BB%D1%8F%20%D0%B4%D0%B5%D1%82%D0%B5%D0%B9&hid=90521&hid=16089018&how=aprice&rs=eJwz0qti4Zh5mPUToxQHg8DCQ6wSDApArsKu_1fZNYAMDRBjBROQtZdp0pnXdgCMkhK6',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
