require('module-alias/register')
const { store, aiDir } = require('@store/index')
const tf = require('@tensorflow/tfjs')
const fs = require('fs')
const path = require('path')
const { parseNdjsonLog, saveModelManually } = require('./fn')

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
	// Путь к вашему файлу логов в корне проекта
	const logPath = path.join(__dirname, 'sensLog.log')

	if (!fs.existsSync(logPath)) {
		console.error(`❌ Ошибка: Файл логов не найден по пути: ${logPath}`)
		return
	}

	console.log('Читаем и размечаем лог-файл NDJSON...')
	const { rawInputs, rawOutputs } = await parseNdjsonLog(logPath)

	if (rawInputs.length === 0) {
		console.error('❌ Ошибка: Не удалось собрать ни одной валидной пары данных для обучения.')
		return
	}

	console.log(`Разметка завершена! Найдено полноценных окон для обучения: ${rawInputs.length}`)

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
	console.log('=== Процесс полностью завершен! ===')
}

// Запуск скрипта
startTraining().catch((err) => console.error('Ошибка:', err))
