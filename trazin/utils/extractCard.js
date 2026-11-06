const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--tovary-dlia-sporta-i-otdykha/54436/list?generalContext=&hid=91512&rs=eJwzyv3EmMLBILDwEKsEg8KPU6wav4D4HxB3nGbV2A7EZ_4JaEz-J6gxfb2txuKtthr7_rWzapwGETdAxCMQse_dPDaNq3PmsGuc6D3DobHqCKtGz1FWjY1A_LybR-P9qwfMe5l02tPtAT3GMC0%2C',
	'https://market.yandex.ru/category/aksessuary-dlya-turizma',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
