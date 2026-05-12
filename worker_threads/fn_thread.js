const { parentPort, workerData, Worker, isMainThread } = require('worker_threads')
const os = require('os')
const arrData = require('./read/data')
const readTCP = require('./read/read_tcp')
const partition = require('./partition')

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

		// Распределение модулей по потокам
		const arrPart = partition(arrData, num)

		// Запуск воркеров
		const results = {}
		for (let i = 0; i < num; i++) {
			const part = arrPart[i]
			const worker = new Worker(__filename, {
				workerData: { id: i, arr: part },
			})
			// Слушаем ответ от потока
			worker.on('message', (r) => {
				// console.log(`Получен ответ от Worker ${i}`, result)
				results = { ...results, ...r }
				if (check(results, num)) resolve(results)
			})
			// При ошибке выполнения
			worker.on('error', (reason) => {
				part.forEach((mdl, i) => {
					results[mdl.ip + '_' + mdl.name] = `Worker ${i}. Error ${reason}`
				})
				if (check(results, num)) resolve(results)
			})
			// Остановка воркера по причине ОС
			worker.on('exit', (code) => {
				part.forEach((mdl, i) => {
					if (results[mdl.ip + '_' + mdl.name] === undefined) results[mdl.ip + '_' + mdl.name] = `Worker ${i}. Exit ${code}`
				})
				if (check(results, num)) resolve(results)
			})
		}
	})
}

// Обработчик потока - читаем модули
async function threadAction() {
	// 2. Мы внутри воркера (Сотрудник).
	// Читаем данные из "чемоданчика" (workerData)
	const { id, arr } = workerData
	const r = {}
	for (const mdl of arr) {
		r[mdl.ip + '_' + mdl.name] = await readTCP(mdl.ip, mdl.port, mdl)
		// Пауза перед опросом следующего модуля (без этой паузы модули читаются не стабильно)
		await delay(100)
	}
	// console.log(`Воркер ${data.id} в работе`, result)
	parentPort.postMessage(r)
}

function delay(time = 0) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, time, !time ? false : true)
	})
}

function check(results, num) {
	if (Object.keys(results).length === num) return results
}
