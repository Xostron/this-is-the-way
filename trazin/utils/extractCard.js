const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = ['https://market.yandex.ru/search?text=%D0%BE%D1%82%D0%B2%D0%B5%D1%80%D1%82%D0%BA%D0%B8&hid=91630&hid=15721749&hid=278423&hid=15221832&rs=eJwz8qli4Xh3mvUTow4Hg8DCQ6wSDApArsLUU_vZFab_F1A40bGQXQMoogES0QCKaIBE_jIyAEEvE4icCiZXMAEVAQBPMBoo&rt=9',
	'https://market.yandex.ru/business--marshall/895958?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D895958%3B&rs=eJwzEv_EKMLBKLDwEKsEg8aiQ6wan8-wapw9zQoAWtkILA%2C%2C&searchContext=sins_ctx'
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 2.5)
	}
}
