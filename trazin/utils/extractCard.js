const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/category/pulovery-dlya-vzroslykh',
	'https://market.yandex.ru/search?text=%D0%BA%D0%BE%D1%81%D0%BC%D0%B5%D1%82%D0%B8%D0%BA%D0%B0%20%D1%83%D1%85%D0%BE%D0%B4%D0%BE%D0%B2%D0%B0%D1%8F&hid=8480738&hid=8475933&hid=91176&hid=8480713&hid=8475955&hid=4854062&hid=4748078&hid=91167&hid=8480736&rs=eJwzyi5grGLleHS-leUTYzAHg8DCQ6wSDAogvsLcVUBixQlWhZMg3mYQb92iFUwK654tZFKYDxR_ABTXACnVACnVOAFiLV_9g1Vj0wlWjelAvO4E6womkIK9TJMeJdgBABelLM0%2C&rt=9'
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
