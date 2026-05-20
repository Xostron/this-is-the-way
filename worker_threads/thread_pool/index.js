const { parentPort, workerData, Worker, isMainThread } = require('worker_threads')
const os = require('os')
const arrData = require('./data')
const readTCP = require('../read/read_tcp')
const { partition, delay } = require('./fn')

// Пул потоков
let pool = null

// Инициализация пула потоков
function initPool(max) {
	if (!isMainThread || pool) return

	const total = os.cpus().length
	let num = Math.max(1, total - 1)
	num = max && num > max ? max : num

	pool = []
	for (let i = 0; i < num; i++) {
		// Создание многоразовых воркеров
		const worker = new Worker(__filename, { workerData: { id: i } })
		pool.push(worker)
	}
}

// Многоразовый поток
async function fnThreadPool(max) {
	// Для главного потока
	if (isMainThread) {
		// Если пул еще не создан, инициализируем его
		if (!pool) initPool(max)
		return manager()
	}
}

module.exports = { fnThreadPool, initPool }

// Менеджер раздачи задач по существующему пулу
function manager() {
	return new Promise((resolve, reject) => {
		// Число воркеров (потоков)
		const num = pool.length
		// Распределяем модули на потоки
		const arrPart = partition(arrData, num)
		// Кол-во завершенных воркеров
		let finishedWorkers = 0
		// Результат
		let results = {}


		// Раздаем порции данных уже созданным воркерам
		for (let i = 0; i < num; i++) {
			const worker = pool[i]
			const part = arrPart[i] || [] // Защита, если порций меньше чем воркеров

			// Если для воркера нет данных, сразу пишем заглушку (чтобы check() сработал)
			if (part.length === 0) continue

			// Вешаем одноразовый слушатель на этот цикл опроса
			worker.once('message', (r) => {
				results = { ...results, ...r }
				checkAndResolve()
			})

			worker.once('error', (reason) => {
				part.forEach((mdl) => {
					results[mdl.ip + '_' + mdl.name] = `Worker ${i}. Error ${reason}`
				})
				checkAndResolve()
			})

			// Отправляем задачу воркеру. Он не умирает после этого!
			worker.postMessage(part)
		}
	})
}

/**
 * Проверка завершения всех воркеров
 * @param {*} num кол-во потоков
 * @param {*} finishedWorkers число завершенных воркеров
 * @returns 
 */
function check(num, finishedWorkers) {
	if (finishedWorkers >= num) {
		// Удаляем слушатели (утечки)
		pool.forEach((worker) => worker.removeAllListeners('message'))
		return true
	}
	return false
}

// Для воркеров - action
if (!isMainThread) {
	const { id } = workerData // id получаем один раз при старте

	// Воркер теперь бесконечно слушает новые порции данных для опроса
	parentPort.on('message', async (arr) => {
		const r = {}

		for (const mdl of arr) {
			try {
				r[mdl.ip + '_' + mdl.name] = await readTCP(mdl.ip, mdl.port, mdl)
			} catch (err) {
				r[mdl.ip + '_' + mdl.name] = `Error: ${err.message}`
			}
			// Ваша пауза стабилизации опроса
			await delay(50)
		}

		// Возвращаем результат в главный поток. Воркер остается жить!
		parentPort.postMessage(r)
	})
}
