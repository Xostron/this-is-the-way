require('module-alias/register')
const tf = require('@tensorflow/tfjs')
const readline = require('readline')
const path = require('path')
const fs = require('fs')
const { store, aiDir } = require('@store/index')
const { fmtTimeV2, roundedTime } = require('@root/tool/time')

function encodeAm(mode) {
	switch (mode?.toLowerCase()) {
		case 'сушка':
			return [1, 0, 0]
		case 'хранение':
			return [0, 1, 0]
		case 'охлаждение':
			return [0, 0, 1]
		default:
			return [0, 1, 0] // По умолчанию хранение
	}
}

// const logsPath = [
// 	path.join(__dirname, 'log', 's1.log'),
// 	path.join(__dirname, 'log', 's2.log'),
// 	// path.join(__dirname, 'log', 's3.log'),
// 	// path.join(__dirname, 'log', 's4.log'),
// 	// path.join(__dirname, 'log', 's5.log'),
// ]
// parseNdjsonLog(logsPath)


// 3. ПОСТРОЧНОЕ ЧТЕНИЕ И СБОРКА ИЗ NDJSON
async function parseNdjsonLog(filenames = []) {
	if (!filenames.length) return []
	const allRecords = []

	for (const filename of filenames) {
		const fileStream = fs.createReadStream(filename, { encoding: 'utf8' })
		const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

		for await (const line of rl) {
			if (!line.trim()) continue
			try {
				const row = JSON.parse(line)
				if (['tprd', 'hin', 'hout', 'tout'].includes(row.message.type)) {
					allRecords.push({
						type: row.message.type,
						value: row.message.value,
						time: row.timestamp,
						timestamp: roundedTime(row.timestamp),
						mode: 'хранение',
					})
				}
			} catch (err) {
				// Игнорируем поврежденные строки логгера
			}
		}
	}
	// console.log(11, allRecords)
	return prepareDataset(allRecords)
}

// 2. ФУНКЦИЯ РАЗМЕТКИ ВРЕМЕННЫХ ОКОН (Sliding Window)
function prepareDataset(logs) {
	const rawInputs = []
	const rawOutputs = []

	// Группируем сырые логи по таймстампу
	const timeMap = new Map()
	logs.forEach((record) => {
		if (!timeMap.has(record.timestamp)) {
			timeMap.set(record.timestamp, {
				tprd: null,
				hin: null,
				tout: null,
				hout: null,
				mode: record.mode,
				time: record.time,
			})
		}
		const current = timeMap.get(record.timestamp)
		if (record.type in current) {
			current[record.type] = record.value
		}
	})

	const toSortableString = (str) => {
		const [date, time] = str.split(', ')
		const [day, month, year] = date.split('.')
		return `${year}${month}${day}${time}`
	}

	Array.from(timeMap.keys()).sort((a, b) => a - b)
	const sortedTimestamps = [...timeMap.keys()]
	sortedTimestamps.sort((a, b) => toSortableString(a).localeCompare(toSortableString(b)))
	// console.log(13, sortedTimestamps)

	// Поиск данных в будущем со смещением в минутах
	function getDataAtOffset(currentIdx, minutesOffset) {
		const ref = new Date(sortedTimestamps[currentIdx])
		const target = [
			new Date(ref.getTime() + (minutesOffset - 10) * 60 * 1000),
			new Date(ref.getTime() + (minutesOffset + 10) * 60 * 1000),
		]
		// console.log(123, '\n*******')
		for (let i = currentIdx; i < sortedTimestamps.length; i++) {
			// console.log(
			// 	124,
			// 	new Date(sortedTimestamps[i]),
			// 	target[0],
			// 	target[1],
			// 	new Date(sortedTimestamps[i]) > target[0],
			// 	new Date(sortedTimestamps[i]) <= target[1]
			// )
			if (
				new Date(sortedTimestamps[i]) >= target[0] &&
				new Date(sortedTimestamps[i]) <= target[1]
			)
				return timeMap.get(sortedTimestamps[i])
			if (sortedTimestamps[i] > target[1]) break
		}
		return null
	}

	// Собираем скользящее окно
	for (let i = 0; i < sortedTimestamps.length; i++) {
		const current = timeMap.get(sortedTimestamps[i])
		// Если в текущей точке нет базовых датчиков — пропускаем
		if (
			current.tprd === null ||
			current.hin === null ||
			current.tout === null ||
			current.hout === null
		)
			continue

		// Ищем состояние продукта через +20, +40 и +60 минут
		const out20 = getDataAtOffset(i, 20)
		const out40 = getDataAtOffset(i, 40)
		const out60 = getDataAtOffset(i, 60)

		// console.log(55, current.time, out20?.time,out40?.time,out60?.time)
		if (!out20 || !out40 || !out60) continue
		if (out20.tprd === null || out40.tprd === null || out60.tprd === null) continue
		if (out20.hin === null || out40.hin === null || out60.hin === null) continue

		// Входной вектор (7 чисел, делим датчики на 100 для нормализации)
		const inputRow = [
			...encodeAm(current.mode),
			current.tprd / 100,
			current.hin / 100,
			current.tout / 100,
			current.hout / 100,
		]

		// Выходной вектор (6 чисел, делим на 100)
		const outputRow = [
			out20.tprd / 100,
			out40.tprd / 100,
			out60.tprd / 100,
			out20.hin / 100,
			out40.hin / 100,
			out60.hin / 100,
		]

		rawInputs.push(inputRow)
		rawOutputs.push(outputRow)
	}
	console.log(33, rawInputs)
	console.log(44, rawOutputs)
	return { rawInputs, rawOutputs }
}

// 4. СОХРАНЯЕМ ИИ НА ДИСК (Вариант для чистой JS версии)
async function saveModelManually(model, folderPath) {
	// Создаем папку, если её нет
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true })
	}

	// Просим TensorFlow выдать нам структуру модели и веса в виде обычных объектов JS
	const saveResult = await model.save(
		tf.io.withSaveHandler(async (modelArtifacts) => {
			return modelArtifacts
		}),
	)

	// 1. Сохраняем файл конфигурации (model.json)
	const modelJson = {
		modelTopology: saveResult.modelTopology,
		weightsManifest: [
			{
				paths: ['./weights.bin'], // имя файла с весами
				weights: saveResult.weightSpecs,
			},
		],
	}
	fs.writeFileSync(`${folderPath}/model.json`, JSON.stringify(modelJson, null, 2))

	// 2. Сохраняем файл весов (weights.bin) в бинарном виде
	const weightsBuffer = Buffer.from(saveResult.weightData)
	fs.writeFileSync(`${folderPath}/weights.bin`, weightsBuffer)

	console.log(`💾 Модель успешно сохранена вручную в папку "${folderPath}"!`)
}

module.exports = { encodeAm, prepareDataset, parseNdjsonLog, saveModelManually }
