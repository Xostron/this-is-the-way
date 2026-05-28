const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--tovary-dlia-avto-i-mototekhniki/54418/list?generalContext=&hid=90402&rs=eJwz8v_E6MPBILDwEKsEg8KiQ6wai4F4DxAfBuLrQHwXiN8CceNhVo0uIJ78rJ1VYwWI2AQiWq8sZdM4e5pV4_MZVo3n3TwA2kUgaA%2C%2C&super-price-filter=1',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
