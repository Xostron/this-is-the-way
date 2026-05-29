const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--bytovaia-tekhnika/54419/list?generalContext=&hid=198118&rs=eJwzsvrEaM7BILDwEKsEg8Kzbh6Nw4dZNc4B8WUg3rncQuPDhnZWjb65L9g0Vh1h1Th7mlXjOVDVgZWtLACYRhd1',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
