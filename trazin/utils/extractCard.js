const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D1%81%D1%83%D0%BC%D0%BA%D0%B8%20%D0%B6%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B5&hid=7812201&hid=91076&rs=eJwzSqti5Xj54g7zC0bGT4y8HAwSDAogrsKR46x_GcVkXu5rYuLieH69nV1gQ_MFXjjn0Kd2HjjnFZCAc14CiV6mlLW89lOZ2sw47VcwgcwDADu-KM4%2C&rt=9&glfilter=14805991%3A14805993',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
