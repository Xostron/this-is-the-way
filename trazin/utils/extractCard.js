const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%BF%D0%BE%D0%BA%D1%80%D1%8B%D1%88%D0%BA%D0%B8%20%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5&hid=90490&rs=eJwz0qhi4fh1iPUTIwcHgwSDApD5l5EBCHqZQORUMLmCCSgMAOduCi0%2C&rt=9',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4.4)
	}
}
