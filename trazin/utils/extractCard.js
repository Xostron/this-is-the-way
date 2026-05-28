const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--odezhda-obuv-i-aksessuary/54432/list?tabId=male_tab&generalContext=&hid=7811881&rs=eJwz8njByPiJ0YmDUWDlszvMEkwaT17cYdZ4BiLOgojmk6waC5ZYaLwAcZ6DiF_bpDTOgxiPQcSLO9PZNWbuns4OAL1HIo8%2C',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
