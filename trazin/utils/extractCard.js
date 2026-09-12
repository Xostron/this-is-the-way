const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%B0%D1%8D%D1%80%D0%BE%D0%B3%D1%80%D0%B8%D0%BB%D1%8C&hid=987827&rs=eJwzSlFy5hK6sOFi78WGC_subAaSOy7svtgjcOtML5cSCweDACeYZICQGgxZDFUcxiYGZoamxkYNjJuX2nQxMnEwVrFwAJkbGBk-MXJwMEgwKAB5K5iAxF6m0kW_bQFCdCFm&rt=11&glfilter=21194330%3A34061532&is_formalized=1',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
