const fnConfig = require('../scrapper/config')
const downloadWebsite = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%B4%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B5%20%D0%B8%D0%B3%D1%80%D1%83%D1%88%D0%BA%D0%B8%20%D0%B8%20%D0%B8%D0%B3%D1%80%D1%8B&hid=10682592&rs=eJwzmskYwFjFyjGzsYf1E2MpB4PAAyBLglPhY0MPq8L0JiBx6ek2NoVPQFGFLVumsSp8bwOyvm-YyKqw-Cirwq9rZ-UUWj6fkNP4BVShAdKs8e7DNjaNpyDWjzft7BonPwK5374CiZu7_7NorAGaqfEBJLu80Vpj__6vrH8Zn5nc2tfLVP9bzn4q0-zzbPYrmEDWAwDBWkRS&super-price-filter=1',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await downloadWebsite(el, true)
	}
}
