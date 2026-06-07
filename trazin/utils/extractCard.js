const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/business--worknord/216655357?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D216655357%3B&rs=eJwzkv_EKMPBKLDwEKsEg8aiQ6wa94-wavQcZdU4e5pVY9URVgCpXws5&searchContext=sins_ctx',
'https://market.yandex.ru/business--plantic/85153628?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D85153628%3B&rs=eJwzEv_EKMLBKLDwEKsEg8b9I6waZ0-zaqw6wgoAXAUIGg%2C%2C&searchContext=sins_ctx',
'https://market.yandex.ru/business--abp-servis/216486573?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D216486573%3B&rs=eJwzEv7EKMDBKLDwEKsEg8azbh6Ns6dZATxIBkw%2C&searchContext=sins_ctx',
'https://market.yandex.ru/business--reton-group/922569?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D922569%3B&rs=eJwzkv7EKMHBKLDwEKsEg8aiQ6waP06xapw9zaqx6ggrAICrCdI%2C&searchContext=sins_ctx',



]


main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el,2)
	}
}
