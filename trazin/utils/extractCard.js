const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--sredstva-i-predmety-gigieny/37497550/list?hid=91172&rs=eJwzcvnE6MjBILDwEKsEg8KSE6waS4H41pmrzBrX365l09h7bQ2bxovvDeway4Di3z8eY9NYDhJavWgyu0b7LCCx_-pkdgDf0B3E',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
