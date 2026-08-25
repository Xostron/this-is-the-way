const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=stm32&hid=16238072&hid=7076558&hid=16213877&hid=13403094&hid=91030&hid=31941450&rs=eJwzSq1i5fjRfZ_9E6MzB4PAwkOsEgwKIL7Cua_rmRW-nrvLrnCtfRObwrTjrAqnjs3l1wDxNECSGlu2TGPV-NB3l10DLHF15gfWv4wMQNDLBCKngskVTCDTAJXLKAM%2C&rt=9',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
