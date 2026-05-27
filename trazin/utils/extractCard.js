const fnConfig = require('../scrapper/config')
const downloadWebsite = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--detskie-tovary/54421/list?generalContext=&hid=10852916&rs=eJwzCv3EGMTBILBlyzRWCVaFnqOsGjd3_2fRWNPUw6px8uM2No13H4DE00Yg9wGI-PGmnV1j__6vrBrLG601TnffZ9f4ASK-fQUq-wVS8QFIAABDvCah',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await downloadWebsite(el, true)
	}
}
