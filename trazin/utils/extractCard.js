const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/business--acmer-store/216468891?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D216468891%3B&rs=eJwzEv_EKMLBKLDwEKsEg0bPUVaNz2dYNc6eZgUAWgUIGQ%2C%2C&searchContext=sins_ctx',
'https://market.yandex.ru/business--traktornyi-zavod-rusich/176568334?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D176568334%3B&rs=eJwzEv_EKMLBKLDwEKsEg8aiQ6wa94-wapw9zQoAWh0IEA%2C%2C&searchContext=sins_ctx',
'https://market.yandex.ru/business--rekkr/166530301?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D166530301%3B&rs=eJwzEv7EKMDBKLDwEKsEg8b9I6waZ0-zAgA9SgZ3&searchContext=sins_ctx',




]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el,15)
	}
}
