const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--tovary-dlia-avto-i-mototekhniki/54418/list?generalContext=&hid=90402&rs=eJwz8vnE6MzBILDwEKsEg8KiQ6wai4F4DxAfBuLrQHwXiN8CceNhVo3Jz9pZNVaAiNYrS9k0zp5m1fh8hlXjeTfPXiaDuqf2AH2GHyc%2C',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4.5)
	}
}
