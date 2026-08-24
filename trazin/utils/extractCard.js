const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--produkty-v-volzhskom/54434/list?hid=91307&rs=eJwzsv_EaMPBILDwEKsEg8Lqk6wae4F418Mv7BpXgYwPu_azayw4xapxEsh5B8RHbh5k11gDZNx9_ppVo-cUKwBBIxtu',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
