const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%BA%D0%B8%D1%81%D0%BB%D0%BE%D1%80%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9%20%D0%BE%D1%82%D0%B1%D0%B5%D0%BB%D0%B8%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C&hid=90691&hid=90688&hid=13041507&rs=eJwzMqti4Th8hPUToxIHg8DCQ6wSDApArsIBIH78bzabBpCjAeRogDgrmIC8vUyzTIPtADcDFYM%2C&rt=9',

	'https://market.yandex.ru/page/weekly?tabId=all_tab&generalContext=t%3DcprPage%3Bcpk%3Dweekly%3B&rs=eJwz4v3EyMLBIMGwl8lXttoeABh9Azo%2C',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
