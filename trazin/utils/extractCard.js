const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')

// Ссылка на каталог
const data = [
	'https://market.yandex.ru/search?text=%D0%B4%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B5%20%D0%B2%D0%B5%D1%89%D0%B8&hid=7869391&hid=10683225&hid=989028&hid=12807781&hid=90796&hid=7878919&hid=987260&hid=10885740&hid=13482954&how=aprice&rs=eJwzmsNYxcpxfvkD5heMjJ8YYzgYBBYeYpVgUAAJKdxs62FVeLLORuHpnV42hTVHWRXaPwGF_yywUXizZQarwqnv29g0gDyNWSd72TTWHmbVACrWaL69h1kDpFVj0tIJrBpH3p5l0_g9_Qh7ExMXx_Pr7ewChz6188A5G5ov8MI564AyK5hAdu9lYnjOagcAtuJC7w%2C%2C&rt=9',
]

main()

async function main() {
	const arr = fnConfig(data, null, true)
	for (const el of arr) {
		await fnUrlCards(el, 4)
	}
}
