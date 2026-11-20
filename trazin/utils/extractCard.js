const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?is_formalized=0&fromWeeklySearch=1&generalContext=t%3DcprPage%3Bfltr%3D1%3Bcpk%3Dweekly%3B&page-key=weekly&text=%D0%B4%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D0%BE%D1%80%D0%BE%D1%88%D0%BE%D0%BA%20%D0%B4%D0%BB%D1%8F%20%D1%81%D1%82%D0%B8%D1%80%D0%BA%D0%B8&hid=90688&rs=eJwz2sioNJmRy_DClgtbLzZdbLyw68KOCzsVLuy_sO9iAxB3XNh3YZcCUHb3xX6Fi40Xmy7sAIoDFQncOtPLpcTCwSEgBSQZBBggpAZDFulmVXEYmxiYWpqYmTcwHjjC2sXIxMFQxcIBZG5gZPjECDRYgmEFE5C7l6lrqaUdAIxCVyI%2C&rt=11&glfilter=21194330%3A34059467&general-context-filter=1',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
