const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = ['https://market.yandex.ru/catalog--tovary-dlia-stroitelstva-i-remonta-v-volzhskom/54503/list?generalContext=&hid=91597&how=rating&rs=eJwzsv7EaMHBILDwEKsEg8LZ06waN4F44xlWjR1APO9FksZiIL7z9AOrxtEFd9k1zh1m1Xj8fxGTxs5JP5kA3KoaaA%2C%2C']

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 5)
	}
}
