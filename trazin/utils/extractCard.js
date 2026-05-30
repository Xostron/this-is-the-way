const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--detskaia-odezhda-i-obuv-v-volgograde/58898/list?rs=eJwzMnjByPiJUYuDUWDhIVYJBo0LCyZKaix_dodZ497PPxIaG2cCuStB3BPnJrFq_DvFCgDZaBTo',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
