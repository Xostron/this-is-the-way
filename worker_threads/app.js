const defaultRead = require('./default_read')
const fnThread = require('./threads')
const { delay } = require('./threads/fn')
const hrtime = process.hrtime.bigint
const os = require('os')

// точка входа, запуск отсюда node ./app.js
main()

async function main() {
	// Всего ядер
	const total = os.cpus().length
	// Доступно ядер
	let num = Math.max(1, total - 1)
	console.log(`Всего ядер ${total}, доступно ядер ${num}, запускаем тест...\n`)
	// Чтение по потокам
	let max = 1
	while (max <= num) {
		try {
			console.log(`ТЕСТ #${max}`)
			console.log('\tКол-во потоков', max)
			// await delay(2000)
			// console.log(20, 'Ожидание прошло, запускаем поток')
			const bgn = hrtime()
			const r = await fnThread(max)
			const end = ((Number(hrtime() - bgn) / 1e6) | 0) / 1000
			// console.log(25, 'Потоки отработали, Результат', Object.keys(r).length)
			// console.log(30, 'подождем еще 2 сек')
			// await delay(2000)
			max++
			console.log('\tВремя опроса = ', end, 'sec\n')
			if (max > num) console.log(r)
		} catch (error) {
			console.log(99, error)
			await delay(5000)
		}
	}
	console.log('******************************************************************')
	// Чтение по умолчанию
	defaultRead()
}

module.exports = main
