const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
'https://market.yandex.ru/catalog--aksessuary-i-oborudovanie-dlia-avtomobilia-v-volzhskom/54454/list?hid=90461&rs=eJwzsv_EaMPBILDwEKsEg8LdQ6waLZs-sGr8eyitcWHyMjaNQ6vXMWksBgkdvLKUTWM_SOzbRiD36602Vo1nh1gBTdocCQ%2C%2C',
'https://market.yandex.ru/catalog--elektroinstrumenty-v-volzhskom/55184/list?hid=91649&rs=eJwzSvrEGM_BILDwEKsEg0LjGVaNEx0L2TUeg4inIKIdKHTgpJ7G1t9f2TUW3prNrtEPFGkG4h4g_vJXUGPqoQ9sGsdm97Fr9AJF-oC4DYibgLgLiDvOsAIAxqkoUg%2C%2C',
'https://market.yandex.ru/catalog--elektroinstrumenty/55184/list?hid=15133985&rs=eJwzSv7EmMDBILDw1mx2CQ6FxjOsGic6FrJrPAYRT0FEO1DowEk9ja2_v7JrgJRp9ANFmoG4B4i__BXUmHroA5vGsdl97Bq9QJE-IG4D4iYg7gLijjOsAA4MKRE%2C',
'https://market.yandex.ru/catalog--elektroinstrumenty/55184/list?hid=294644&rs=eJwzSvrEGM_BIPDlr6AEh0LjGVaNEx0L2TUeg4inIKIdKHTgpJ7G1t9f2TUW3prNrtEPFGkG4h4gBmrTmHroA5vGsdl97Bq9QJE-IG4D4iYg7gLijjOsAAB9KPQ%2C',
'https://market.yandex.ru/catalog--akkumuliatornyi-instrument-v-volzhskom/52649964/list?rs=eJwzMvnEaMjBKLDwEKsEg8aJjoXsGvdOfWDS-LdiArtG-xlWjQMn9TQW3prNrjH10Ac2jT6gSNMZVgAo-xWG',
'https://market.yandex.ru/catalog--unitazy-pissuary-bide-v-volzhskom/18060330/list?rs=eJwzEvnEKMjBKLDwEKsEg8aKJx9YNe6cZgUARxMHYQ%2C%2C',
'https://market.yandex.ru/search?text=%D0%B8%D0%B3%D1%80%D1%83%D1%88%D0%BA%D0%B8%20%D0%B4%D0%BB%D1%8F%20%D0%B4%D0%B5%D0%B2%D0%BE%D1%87%D0%B5%D0%BA&hid=13480619&hid=10683227&hid=10682610&hid=10682550&hid=10682526&hid=10682676&hid=10683225&hid=15525081&rs=eJwz6mKsYuVY_XQb2ydGPw4GgYWHWCUYFEB8hdttPawKnxqBxDYQMQ9EbGkCEjdBEjdPbmbXWAUU0wCp0wCp0_jYACQergFKgJT8Zdxx496-JiYujufX29kFNjRf4IVzDn1q5-llErAWtp_KZP6G134FE8hKAGWdOJ8%2C&rt=9',
'https://market.yandex.ru/search?text=%D0%BC%D0%B8%D0%BA%D1%80%D0%BE%D1%84%D0%B8%D0%B1%D1%80%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8F&hid=14368679&hid=90468&hid=12943705&hid=14369113&rs=eJwzCqxi5Vj-_w3bJ0Z9DgaBhYdYJRgUQHyFJ4dYFW42TWMDEm_ZNKYDhTQWb_rAqnENKKYBEvvLeOL_yX29TPPDZO2nMs1YKWG_ggmkEwCyxyS2&rt=9',
'https://market.yandex.ru/search?text=%D0%B4%D0%B0%D1%87%D0%BD%D1%8B%D0%B5%20%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BA%D0%B8&hid=13777172&hid=13007553&rs=eJwzsq1i5Zjy6QTbJ0ZpDgaBhYdYJRgUQHyFg19nsmmAWBofT7P-ZbxU-39fL5MIJ5v9VCbjT1_sVjCB5AAMzxom&rt=9'
]

main()

async function main() {
	const arr = fnConfig(data,null, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
