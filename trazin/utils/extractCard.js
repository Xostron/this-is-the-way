const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--detskie-tovary/54421/list?generalContext=&hid=10852916&rs=eJwziv7EGMTBILBlyzRWCVaFnqOsGjd3_2fRWNPUw6px8uM2No13H4DE00Yg9wGI-PGmnV1j__6vrBrLG601TnffZ9f4ASK-fQUq-wVS8QFI7GVyvLnKHgA3Uylp',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
