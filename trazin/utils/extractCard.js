const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = ['https://market.yandex.ru/page/weekly?tabId=all_tab&utm_medium=sharing&generalContext=t%3DcprPage%3Bcpk%3Dweekly%3B&rs=eJwz4nrByPiJkYWDQYIBABL7Aj4%2C']

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4.5)
	}
}
