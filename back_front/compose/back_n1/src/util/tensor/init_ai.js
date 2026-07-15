const { aiDir } = require('@root/store')
const { readOne } = require('@root/tool/json')
const tf = require('@tensorflow/tfjs')
const fs = require('fs')
const { store } = require('@store/index')

async function initAI() {
	try {
		const modelJson = await readOne('model.json', aiDir)
		const weightsBin = fs.readFileSync(`${aiDir}/weights.bin`)
		// 2. Правильно собираем объект ModelArtifacts для ручной загрузки
		const modelArtifacts = {
			modelTopology: modelJson.modelTopology,
			// ИСПРАВЛЕНИЕ: Достаем массив спецификации весов напрямую из манифеста
			weightSpecs: modelJson.weightsManifest[0].weights,
			weightData: weightsBin.buffer, // Бинарный буфер весов
		}
		// 3. Передаем этот объект ОДНИМ аргументом в tf.io.fromMemory
		store.climateAI = await tf.loadLayersModel(tf.io.fromMemory(modelArtifacts))
		console.log('🤖 ИИ-модель климата успешно загружена!')
	} catch (e) {
		console.error('❌ Не удалось загрузить ИИ-модель:', e)
	}
}

module.exports = { initAI }
