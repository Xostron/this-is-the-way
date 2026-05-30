const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--detskaia-odezhda-i-obuv-v-volzhskom/58898/list?rs=eJwzUnrByPiJUYaDUWDhIVYJBo0LCyZKatz7-UdCY-NMIGvlszvMANxzDe4%2C&super-price-filter=1',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
