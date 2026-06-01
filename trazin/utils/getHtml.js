const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--tovary-dlia-stroitelstva-i-remonta-v-volzhskom/54503/list?generalContext=&hid=91597&rs=eJwzsv3EaMXBILDwEKsEg8LZ06waN4F44xlWjR1APO9FksZiIL7z9AOrxtEFd9k1Fh1i1Vh1hFXjM1D2WTcPAAqLGk8%2C',
]

main()

async function main() {
	const arr = fnConfig(data, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}