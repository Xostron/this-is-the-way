const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--tovary-dlia-sporta-i-otdykha-v-volzhskom/54436/list?generalContext=&hid=91512&rs=eJwzCvzE6MfBILDwEKsEg8KPU6wav4D4HxB3nGbVmAPEZ_4JaEz-J6gxfb2txuKtthqn_7WzatwAEY9AxL5389g0TvSe4dBYdYRV4_2rB8wAgs4kVQ%2C%2C',
	'https://market.yandex.ru/catalog--zhenskaia-sportivnaia-odezhda-v-volzhskom/54360102/list?rs=eJwzsn7ByPiJ0ZSDUWDhIVYJBo1TvUckNf5NBxLzpwGJ--1AYsX8c5Iat-YAWQ0dQGL6DCDxDEgAAMvmGUk%2C',
	'https://market.yandex.ru/search?text=%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B8%20%D0%BC%D1%83%D0%B6%D1%81%D0%BA%D0%B8%D0%B5&hid=53546007&hid=53546173&rs=eJwzOsyoVMAlf7HlYvPFpgsbL-y7sPvCrgs7FC7sudh8YdvFRhDnwlaB59fb2ZVYODgFBIAkgwADhNRgyCKks4rD0MTCwNTS0qiBcX37EckuRiYOhipWjukzjkhuYGR4wcj4iVEGaNbCQ6wSDAogUYW9M49IaoBYGiDWX8YT-1j2NzFxcYDcIPACSPQyFVz8aTeVqcD4s90KJpBKALEzV6I%2C&rt=11&glfilter=14805991%3A14805992',
	'https://market.yandex.ru/search?text=%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B8%20%D0%B6%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B5&hid=53546007&rs=eJwzOsGoVMQlf7HlYvPFpgsbL-y7sPvCrgs7FC5su7D1wt6LjSDOha0Ct870cgk8v97OrsTCwSDAASYZ4CSngACyiAZDFkMVh5GZgYGBqbFBFYehiYWBqaWlcQPj9BlHJLsYmTgYq1g5QOwNjAwvGBk_MQoBtS08xCrBoAAS1TgyZYHiX8ZVcUz7m5i4OEDWCrwCEnDOSyDRy6QuxmA_lYkr8pvdCiaQNgDnuESf&rt=11&glfilter=14805991%3A14805993',
	'https://market.yandex.ru/catalog--feny-i-fen-shchetki-v-volzhskom/16336735/list?hid=16336734&rs=eJwzkv_EKMPBILDwEKsEg8K9vqfsGsfPb1bU2HkHSKx-uVkRALxwDSQ%2C',
'https://market.yandex.ru/catalog--tovary-dlia-tvorchestva-i-khobbi/60774/list?hid=90748&rs=eJwzMvrEqM_BILDwEKsEg8KfI6waBzdsZtc4c3k_m8b2g0DW4oub2DUargK5D9cAuQdPbmYHAAdBFa8%2C',
'https://market.yandex.ru/catalog--tovary-dlia-shkoly-i-ofisa/17984632/list?hid=10790728&rs=eJwzMvrEqM_BILDwEKsEg8KJc5NYNd5-OMum8e4qt0bfeyDjyFsgMes1kLgDIjYd_MQGACDQFzM%2C',
'https://market.yandex.ru/catalog--tovary-dlia-zdorovia/54734/list?hid=8475840&rs=eJwziv3EGMXBILDwEKsEg8KBla0sGjMPs2pMA-I1QNz-4jOTxon2qzIac_4tltDYePogu0b3P0ON8_8ENHa-fciuMQeoaCUQLwLiXRs_sGlM67_KrvFszSc2jV3_r7IDADVpKYQ%2C',
'https://market.yandex.ru/search?text=%D0%B3%D0%B5%D0%BB%D1%8C%20%D0%B4%D0%BB%D1%8F%20%D0%B4%D1%83%D1%88%D0%B0&hid=91176&rs=eJwz0qhi4VhxgvUTIwcHgwSDApD5lzFB_O6-XiaRycL2U5m6Q_ntVzABhQER0Q2C&rt=9',
'https://market.yandex.ru/catalog--naushniki-i-audiotekhnika-v-volzhskom/26992071/list?rs=eJwzMv_EaMLBKLDwEKsEg0bjEVaN1Q8fsGusP8yqsR-INwLxbiDeu2wZo8bvR8c4NJ6s2squceAwKwBYiRb4',
]


main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el,20)
	}
}
