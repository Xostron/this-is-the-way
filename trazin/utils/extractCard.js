const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%BF%D1%8B%D0%BB%D0%B5%D1%81%D0%BE%D1%81&hid=16302537&hid=16302536&hid=16302535&hid=71672081&rs=eJwzCqpi5TjZ_Jj9E6MBB4PAwkOsEgwKIL7CCRBxHERMPDRNSQPE0gBJaIC5INm_jHYOT_f1Mu3L4befysQSzG2_ggmkAgB0mSGv&rt=9',
]

main()

async function main() {
	const arr = fnConfig(data,null, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
