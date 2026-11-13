const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%BC%D0%B0%D1%81%D0%BA%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%BB%D0%B8%D1%86%D0%B0%20%D1%82%D0%BA%D0%B0%D0%BD%D0%B5%D0%B2%D0%B0%D1%8F&hid=8476097&rs=eJwz0i9gqGLlOLi6leUTozgHg8DCQ6wSDAogvsaW9W_kNB7deSO3ggnE38s0o_enHQChOxNE&rt=9',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
