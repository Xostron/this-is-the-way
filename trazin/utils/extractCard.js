const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = ['https://market.yandex.ru/catalog--planshety-v-volzhskom/26908970/list?hid=6427100&how=rating&rs=eJwz4vnEyMnBIMGgcGdxBzMAFx8DhQ%2C%2C']

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
