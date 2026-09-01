const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B8&hid=53546007&hid=52710834&rs=eJwzcqxi5Zg-44jkC0bGT4wyHAwCCw-xSjAogIQUNs2eKKkBYmmAWH8ZGYCglwlETgWTK5hAkgDUURQI&rt=9',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
