const fnConfig = require('../scrapper/config')
const { fnUrlCards } = require('../scrapper')
// Ссылка на каталог
const data = [
	'https://market.yandex.ru/catalog--bytovaia-khimiia/21448850/list?hid=90685&how=dprice&rs=eJwz0v7EqMHBILDwEKsEg8LeI6waB4G4--gZdo2zS8-za_x7uZZN4xBQaMertWwAa8ISFg%2C%2C',
	'https://market.yandex.ru/catalog--podguzniki-gigiena-i-ukhod-v-volzhskom/16411289/list?how=dprice&rs=eJwzsvzEaMbBKLDwEKsEg8aTdTYaHxt6WDXmL53AqnH97Vo2jb3X1rBpvAGKzwAJLTvBqjF3VSuLxqYTrACZ3heN',
	'https://market.yandex.ru/catalog--zhenskie-tolstovki-i-svitshoty-v-volzhskom/72077671/list?rs=eJwzMnzByPiJUZuDUWDhIVYJBo1TZ5Ypaqz8t0JRY_KpVYoaf6euUdT49BtIPH-4VlHjzvF1igD1thYz',
'https://market.yandex.ru/catalog--sredstva-po-ukhodu-za-litsom-v-volzhskom/17437151/list?hid=8475933&rs=eJwzsvjEaMrBILDwEKsEg8LcVa0sGsdu32DXOL4ayDoMIg6CiEMg4vc6IHEUxDoGJABygxbd',
'https://market.yandex.ru/catalog--sredstva-po-ukhodu-za-telom-v-volzhskom/17437172/list?hid=91186&rs=eJwzCv7EGMDBILDwEKsEg8KmE6wax750MWvsXNXKovH65AV2jflAoVdX17BprAAyWq4BGZtBcnemXWbXuPJpErvGvRmT2TW6PwNZy2asYNJYCiQAvkEj0w%2C%2C',
'https://market.yandex.ru/catalog--aksessuary-dlia-poliva-v-volzhskom/18033951/list?hid=13793399&rs=eJwzMv7EaMDBILDwEKsEg8L3DyfZNCau3cCu0fcRyJoJIv6BxLpBrCYQ8RPIBQA24Bet',
'https://market.yandex.ru/catalog--sadovaia-mebel-v-volzhskom/66298/list?hid=13771160&rs=eJwzCvzE6MfBILDwEKsEg8KMwyfYNJ5sO8SucevMBnaNWceA3J-zXrFrXAaxOk8AiU_7T7FpbAJxrx8HEruOAomXIKL7AFBiM1AMANcMJgU%2C',
'https://market.yandex.ru/catalog--otdelochnye-materialy-v-volzhskom/18060933/list?hid=91633&how=dprice&rs=eJwzivrEGM7BILDwEKsEg8LH06waLTfmsGl8BjJmvH7ArDFtHpC3dLaGxiegyMOr39g1DnyZyabxE8j7tOglu8YvIGPVs_PsGhNnz2LTOPgVKPf94lJ2jZlALgAEBijj',
'https://market.yandex.ru/catalog--stroitelnye-materialy-v-volzhskom/18060645/list?hid=12333652&how=dprice&rs=eJwzsvrEaM7BILDwEKsEg8KVJx9YNSbdXsauMfn-LDaNzntAYvoZVo2dk-eya_x5AORdewIklgKFrpxhBQDBmxjg',
'https://market.yandex.ru/catalog--avtokhimiia-i-avtokosmetika-v-volzhskom/54449/list?hid=90428&how=dprice&rs=eJwzMvvEaMzBILDwEKsEg8KeQ6war4G4se0tm8ZpEDH9_xs2jZtNQNbuZiDxsAVInABKAABYaxea',
'https://market.yandex.ru/catalog--vitaminy-bad-i-dobavki/25600170/list?how=dprice&rs=eJwzUvzEKMfBKLDwEKsEg8bMw6waG08fZNfo_meosXirrcau_1fZAcmxDU8%2C',
'https://market.yandex.ru/catalog--melkaia-tekhnika-dlia-kukhni-v-volzhskom/54472/list?hid=90579&how=dprice&rs=eJwzUvrEKM_BILDwEKsEg8Llw6wai7Z-YNXYCSI6QMTrw6wA3o8N7g%2C%2C'




]

main()

async function main() {
	const arr = fnConfig(data,null, true)
	for (const el of arr) {
		await fnUrlCards(el)
	}
}
