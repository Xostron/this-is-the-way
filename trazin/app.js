const data = require('./data')
const downloadWebsite = require('./scrapper')
const fnConfig = require('./scrapper/config')

// Конфиги на ссылки

main()

async function main() {
    const arr = fnConfig(data)
	for (const el of arr) {
		await downloadWebsite(el)
	}
}
