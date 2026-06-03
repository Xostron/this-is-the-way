const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
'https://market.yandex.ru/business--gk-iunikom/886432?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D886432%3B&rs=eJwzkv7EKMHBKLDwEKsEg8aiQ6waZ0-zaqw6wqrRe5gVAH1kCWA%2C&searchContext=sins_ctx',
'https://market.yandex.ru/business--ellko/204396890?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D204396890%3B&rs=eJwzEv7EKMDBKLDwEKsEg8aiQ6wa94-wAgA7uwZD&searchContext=sins_ctx',
'https://market.yandex.ru/search?generalContext=t%3Dmerchant%3Bi%3D1%3Bmrch%3D1229804%3B&rs=eJwzkv7EKMHBKLDwEKsEg8aiQ6wajcdZNc6eZtV43s0DAHu8CWM%2C&merchant-filter=1229804',


]

main()

async function main() {
	const arr = fnConfig(data,null, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
