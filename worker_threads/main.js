const fnThread = require('./fn_thread')

async function main() {
	console.log(10, 'Подождем 2 сек')
	await delay(2000)
	console.log(20, 'Ожидание прошло, запускаем поток')
	const r = await fnThread()
	console.log(25, 'Результат', r)
	console.log(30, 'Потоки в работе, подождем еще 2 сек')
	await delay(2000)
	console.log(40, 'ожидание прошло')
}

module.exports = main

function delay(time = 0) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, time, !time ? false : true)
	})
}
