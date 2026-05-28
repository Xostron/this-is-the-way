const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--produkty/54434/list?hid=91325&rs=eJwzCvvEGMzBILD3JKsEk8Lqk6wah4D48cmb7Bpv9uxn17gFIo4DhR6CGH8mAYknkxrZNR5232LXeAASewcSewFiPe9Yx6ax7BSrxv-TrACAoidx',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
