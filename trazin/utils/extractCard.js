const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B8%20%D0%BC%D1%83%D0%B6%D1%81%D0%BA%D0%B8%D0%B5&hid=53546007&hid=53546173&how=rating&rs=eJwzOsyoVMAlf7HlYvPFpgsbL-y7sPvCrgs7FC7sudh8YdvFRhDnwlaB59fb2ZVYODgFBIAkgwADhNRgyCKks4rD0MTCwNTS0qiBcX37EckuRiYOhipWjukzjkhuYGR4wcj4iVEGaNbCQ6wSDAogUYW9M49IaoBYGiDWX0YGIGhi4uIAuUHgBZDoZQIJTQWTK5hAKgEww1EN&glfilter=14805991%3A14805992',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 5)
	}
}
