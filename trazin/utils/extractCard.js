const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--naushniki-i-garnitury-v-volgograde/26893870/list?hid=90555&rs=eJwz4v7EyMHBIMGgsPswKwAS3wL8&glfilter=21194330%3A34063178%2C34063700',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
