const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--sredstva-po-ukhodu-za-telom-v-volzhskom/17437172/list?hid=91186&rs=eJwz8vvE6M3BILDwEKsEg8KmE6wax750MWvsXNXKojEfyHt1dQ2bxgogo-UakLEZJHxn2mV2jSufJrFr3JsxmV2j-zOQtWzGCiaNpUACAPQXIRY%2C',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
