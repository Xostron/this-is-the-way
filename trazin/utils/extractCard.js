const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = ['https://market.yandex.ru/business--kuppersberg/718933?utm_medium=sharing&generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D718933%3B&rs=eJwzEv7EKMDBKLDwEKsEg8azbh6NVUdYATvRBiI%2C&searchContext=sins_ctx']

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 3)
	}
}
