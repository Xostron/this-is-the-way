const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/',
'https://market.yandex.ru/page/rus_designers?generalContext=t%3DcprPage%3Bcpk%3Drus_designers%3B&rs=eJwzUn_ByPiJUZGDUWDhIVYJBo0LCyZKauxduUlSY337EUmNjTOB3JXP7jADABw7D3k%2C',
'https://market.yandex.ru/catalog--tovary-dlia-doma/54422/list?generalContext=&hid=90666&rs=eJwzMv_EaMLBILDwEKsEg8KqI6waq4F4LxAfAeIrQHwLiHdO-smk8fTALWaNnTvbWTVmHD7BBgBSVRba',
'https://market.yandex.ru/search?text=%D0%BA%D0%B0%D0%BD%D1%86%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D1%8B&hid=13858702&nid=17985469&rs=eJwzivjEGMrBILDwEKsEg0Lf-7NsGlNBxI8jrBpH5s5l05gI4n0F8i4D8RQQpx9EfAPyvgDxdyCeDhL4D2RMAzF-f_nMrtFwnBUAynQotQ%2C%2C&rt=10',
'https://market.yandex.ru/catalog--tovary-dlia-stroitelstva-i-remonta-v-volzhskom/54503/list?generalContext=&hid=91597&rs=eJwzsv3EaMXBILDwEKsEg8LZ06waN4F44xlWjR1APO9FksZiIL7z9AOrxtEFd9k1Vh1h1Wg8zqrxGSj7rJsHAAl6GjM%2C'


]


main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el,20)
	}
}
