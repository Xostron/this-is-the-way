const { parentPort, workerData, Worker, isMainThread } = require('worker_threads')
const os = require('os')
const arrData = require('./read/data')
const readTCP = require('./read/read_tcp')

// Если Node.js зашел в этот файл как в Воркер, вызываем функцию принудительно
if (!isMainThread) {
	fnThread()
}

async function fnThread() {
	if (isMainThread) {
		return manager()
	} else {
		await threadAction()
	}
}

module.exports = fnThread

// Менеджер запуска воркеров и сбора результата
function manager() {
	return new Promise((resolve, reject) => {
		// Основной поток. создание воркеров
		const total = os.cpus().length
		const num = Math.max(1, total - 2)
		console.log(1, `Главный поток, запускаем ${num} воркеров`)
		createChunck(arrData, 3)
		const results = {}
		// Запуск воркеров
		for (let i = 0; i < num; i++) {
			const mdl = arrData[i]
			const worker = new Worker(__filename, {
				workerData: { id: i, mdl },
			})
			// Слушаем ответ от потока
			worker.on('message', (result) => {
				// console.log(`Получен ответ от Worker ${i}`, result)
				results[mdl.ip + '_' + mdl.name] = result
				if (check(results, num)) resolve(results)
			})
			// При ошибке выполнения
			worker.on('error', (reason) => {
				results[mdl.ip + '_' + mdl.name] = `Worker ${i}. Error ${reason}`
				if (check(results, num)) resolve(results)
			})
			// Остановка воркера по причине ОС
			worker.on('exit', (code) => {
				if (results[mdl.ip + '_' + mdl.name] === undefined)
					results[i] = `Worker ${i}. Exit ${code}`
				if (check(results, num)) resolve(results)
			})
		}
	})
}

// Обработчик потока
async function threadAction() {
	// 2. Мы внутри воркера (Сотрудник).
	// Читаем данные из "чемоданчика" (workerData)
	const { id, mdl } = workerData
	let v = await readTCP(mdl.ip, mdl.port, mdl)
	// Пауза перед опросом следующего модуля (без этой паузы модули читаются не стабильно)
	await delay(100)
	// console.log(`Воркер ${data.id} в работе`, result)
	parentPort.postMessage(v)
}

function delay(time = 0) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, time, !time ? false : true)
	})
}

function check(results, num) {
	if (Object.keys(results).length === num) return results
}

/**
 *
 * @param {*} arr массив модулей на чтение
 * @param {*} num Кол-во потоков
 * @returns {object[][]}
 */
function createChunck(arr, num) {
	const dataThread = new Array(num).fill([])
	console.log(1234, dataThread)
	let i = 0
	while (i < arr.length) {
		dataThread.forEach((chunk, j) => {
			chunk.push(arr[i])
			i += 1
			console.log(999, i, dataThread)
		})
	}
	// console.log(55, dataThread)
	return dataThread
}
