const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/business--the-welder-catherine/55141408?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D55141408%3B&rs=eJwzsvjEaMrBKLDwEKsEg8bPSatlNf6ceyGrcXbJZXaNNZfb5DQeLwKyNi0GEg0g4sy7_ewacxdfZAcAsa4ZRw%2C%2C&searchContext=sins_ctx',
'https://market.yandex.ru/business--marideniz/167609257?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D167609257%3B&rs=eJwBLgDR_zIs6AEB8gEmCAEQocIFGAAors3oHyiR__EfKK7txyAojKyYISjElKAhKOfhrSGM5xMv&searchContext=sins_ctx',
'https://market.yandex.ru/business--home-comfort1/173620553?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D173620553%3B&rs=eJwzUv7EqMDBKLDwEKsEg8azbh6N-0dYNRqPs2r8OMWqsQrI7j3MCgDeZAzz&searchContext=sins_ctx',
'https://market.yandex.ru/business--frester/216555028?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D216555028%3B&rs=eJwzEv_EKMLBKLDwEKsEg0bPUVaNs6dZNVYdYQUAWH4HyA%2C%2C&searchContext=sins_ctx',
'https://market.yandex.ru/business--starrko/130269375?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D130269375%3B&rs=eJwzUnjByPiJUYqDUWDhIVYJBo0DK1tZND6fYdV4_-oBs8aPU6wAvHcMvA%2C%2C&searchContext=sins_ctx',
'https://market.yandex.ru/search?generalContext=t%3Dmerchant%3Bi%3D1%3Bmrch%3D1229804%3B&rs=eJwzkv7EKMHBKLDwEKsEg8aiQ6wajcdZNc6eZtV43s0DAHu8CWM%2C&merchant-filter=1229804',




]

main()

async function main() {
	const arr = fnConfig(data,null, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
