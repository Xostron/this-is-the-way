const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = ['https://market.yandex.ru/catalog--naushniki-i-bluetooth-garnitury-v-volzhskom/26992150/list?hid=90555&how=rating&rs=eJwz4v7EyMHBIMGgsPswKwAS3wL8']

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 5)
	}
}
