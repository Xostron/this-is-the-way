const data = require('./data')
const downloadWebsite = require('./scrapper')
const fnConfig = require('./scrapper/config')

// Конфиги на ссылки
const arr = fnConfig(data)

main()

async function main() {
	for (const el of arr) {
		await downloadWebsite(el)
	}
}
