const tf = require('@tensorflow/tfjs')
const { store } = require('@store')
const { compareTime } = require('@root/tool/time')
const { encodeAm } = require('./fn')
const _AI_INTERVAL = 20 * 1000

async function getClimateAI(inData) {
	// console.log(11, store.tCheckAi, compareTime(store.tCheckAi, _AI_INTERVAL))
	// if (store.climateAI && compareTime(store.tCheckAi, _AI_INTERVAL)) {
	// ЗАПУСКАЕМ ПРОГНОЗ ВНУТРИ БЕЗОПАСНОЙ ЗОНЫ ДЛЯ ПАМЯТИ
	const aiResult = tf.tidy(() => {
		// Собираем массив из 7 параметров и делим на 100 (Нормализация)
		const inputTensor = tf.tensor2d([
			[
				...encodeAm(inData.automode ?? 'хранение'),
				inData.tprd / 100,
				inData.hin / 100,
				inData.tout / 100,
				inData.hout / 100,
			],
		])

		// Делаем прогноз
		const prediction = store.climateAI.predict(inputTensor)

		// Извлекаем чистые числа из тензора
		const result = prediction.dataSync()

		// Возвращаем денормализованные (умноженные обратно на 100) данные
		return {
			// Режем массив пополам и денормализуем
			tprd: Array.from(raw6Numbers.slice(0, 3)).map((v) => Math.round(v * 100)), // [+20, +40, +60 мин]
			hin: Array.from(raw6Numbers.slice(3, 6)).map((v) => Math.round(v * 100)), // [+20, +40, +60 мин]
		}
	})

	// Сбрасываем таймер
	store.tCheckAi = new Date()

	console.log(
		`🔮 Прогноз ИИ через 3 часа в ангаре: Т = ${aiResult.tprd}°C, Вл = ${aiResult.hin}%`,
	)
	return aiResult
}

module.exports = { getClimateAI }
