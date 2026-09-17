const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%BF%D1%8B%D0%BB%D0%B5%D1%81%D0%BE%D1%81&hid=16302537&hid=16302535&hid=16302536&hid=281934&rs=eJwzsqpi5TjZ_Jj9E6MKB4PAwkOsEgwKIL7CcRBxAkScmyWo8XbBDXYNIGMFE0hyL9OM74V2AKnpGIM%2C&rt=9',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
