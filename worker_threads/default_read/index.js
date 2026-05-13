const readTCP = require('../read/read_tcp')
const arrData = require('../threads/data')
const { delay } = require('../threads/fn')
const hrtime = process.hrtime.bigint

async function defaultRead() {
	try {
		console.log(`ТЕСТ #Чтение в основном потоке`)
		const bgn = hrtime()
		const r = {}
		for (const mdl of arrData) {
			r[mdl.ip + '_' + mdl.name] = await readTCP(mdl.ip, mdl.port, mdl)
			// Пауза перед опросом следующего модуля (без этой паузы модули читаются не стабильно)
			await delay(50)
		}
		const end = ((Number(hrtime() - bgn) / 1e6) | 0) / 1000
		console.log('\tВремя опроса = ', end, 'sec\n')
		console.log(r)
	} catch (error) {
		console.log('Ошибка чтения defaultRead, по причине', error)
	}
}

module.exports = defaultRead
