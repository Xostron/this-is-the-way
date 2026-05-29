const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%BE%D0%B1%D1%83%D0%B2%D1%8C%20%D0%B6%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F&hid=53253309&nid=53253313&rs=eJwzct7AyPiCkfEToxUHg8DCQ6wSDAp7V26S1PgAIhavAhLnVwOJdhBrMoi1BsR6CyL2gIjDQDEAfOgcQw%2C%2C&rt=10&glfilter=14805991%3A14805993',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
