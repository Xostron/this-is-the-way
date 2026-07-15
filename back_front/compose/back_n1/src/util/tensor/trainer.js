require('module-alias/register')
const { store, aiDir } = require('@store/index')
const tf = require('@tensorflow/tfjs')
const fs = require('fs')
const path = require('path')
const { encodeAm } = require('./fn')

// 1. ОПРЕДЕЛЯЕМ АРХИТЕКТУРУ ИИ (Конструктор)
function createModel() {
	const model = tf.sequential()
	// Входной слой: принимает 7 чисел
	model.add(tf.layers.dense({ inputShape: [7], units: 64, activation: 'relu' }))
	// Дополнительный глубокий скрытый слой для анализа инерции продукта
	model.add(tf.layers.dense({ units: 32, activation: 'relu' }))
	// Выходной слой: 6 чисел (Прогноз Т_продукта и Вл_продукта за ближайший час три точки 20, 40, 60мин)
	model.add(tf.layers.dense({ units: 6 }))

	model.compile({
		optimizer: tf.train.adam(0.005), // Снизили шаг для более точной подгонки
		loss: 'meanSquaredError',
	})

	return model
}

// 2. ГЛАВНАЯ ФУНКЦИЯ ОБУЧЕНИЯ (Точка входа)
async function startTraining() {
	console.log('=== Старт подготовки ИИ ===')

	// ИИ не понимает текст и градусы. Ей нужны матрицы чисел (Тензоры).
	// Все числа делим на 100, чтобы они были в диапазоне от 0 до 1 (Нормализация).

	// Пример сборки векторов для обучения в trainer.js
	const rawInputs = [
		// Строка из лога в 12:00 -> [Сушка, Хран, Охл, Т_прод, Вл_прод, Т_ул, Вл_ул]
		[...encodeAm('сушка'), 14 / 100, 75 / 100, 20 / 100, 60 / 100],
	]

	const rawOutputs = [
		[
			// Первые 3 числа — Температура продукта через +20, +40, +60 мин
			14.2 / 100,
			14.5 / 100,
			14.8 / 100,
			// Следующие 3 числа — Влажность продукта через +20, +40, +60 мин
			74.5 / 100,
			74.0 / 100,
			73.5 / 100,
		],
	]

	// Переводим обычные массивы JS в Тензоры TensorFlow
	const xs = tf.tensor2d(rawInputs)
	const ys = tf.tensor2d(rawOutputs)

	const model = createModel()

	console.log('Обучение ИИ началось. Пожалуйста, подождите...')

	// fit() — это процесс обучения. ИИ сделает 500 проходов (эпох) по вашим логам
	await model.fit(xs, ys, {
		epochs: 500,
		shuffle: true,
		callbacks: {
			// Выводим прогресс каждые 50 шагов
			onEpochEnd: (epoch, logs) => {
				if (epoch % 50 === 0)
					console.log(`Эпоха ${epoch}: Ошибка модели = ${logs.loss.toFixed(5)}`)
			},
		},
	})

	console.log('Обучение успешно завершено!')

	// 3. СОХРАНЯЕМ ИИ НА ДИСК
	// Создаст папку 'my-climate-model' с весами ИИ, чтобы запускать её без обучения
	await saveModelManually(model, aiDir)
	console.log("Модель сохранена в папку './my-climate-model'")

	// Чистим память за TensorFlow
	xs.dispose()
	ys.dispose()
}

// Запуск скрипта
startTraining().catch((err) => console.error('Ошибка:', err))

// 3. СОХРАНЯЕМ ИИ НА ДИСК (Вариант для чистой JS версии)
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
