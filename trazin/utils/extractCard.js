const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/page/crossborder_dep?generalContext=t%3DcprPage%3Bcpk%3Dcrossborder_dep%3B&rs=eJwz4nrByPiJkYWDQYIBABL7Aj4%2C',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
