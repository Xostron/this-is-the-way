import * as tf from '@tensorflow/tfjs'

export class Brain {
	constructor(inputSize, hiddenSize, outputSize, model = null) {
		this.inputSize = inputSize
		this.hiddenSize = hiddenSize
		this.outputSize = outputSize

		if (model) {
			this.model = model
		} else {
			this.model = this.createModel()
		}
	}

	createModel() {
		const model = tf.sequential()

		model.add(
			tf.layers.dense({
				units: this.hiddenSize,
				inputShape: [this.inputSize],
				activation: 'tanh',
			}),
		)

		model.add(
			tf.layers.dense({
				units: this.outputSize,
				activation: 'tanh',
			}),
		)

		return model
	}

	predict(inputs) {
		return tf.tidy(() => {
			const inputTensor = tf.tensor2d([inputs])
			const outputTensor = this.model.predict(inputTensor)
			return outputTensor.dataSync()
		})
	}

	/**
	 * Безопасное клонирование и мутация через извлечение чистых данных
	 */
	mutate(rate, code) {
		const clonedModel = this.createModel()

		// 1. Вытаскиваем веса родителя в виде обычных массивов чисел JS (они не зависят от памяти TF)
		const rawWeightsData = this.model.getWeights().map((w, i) => {
			return {
				data: w.dataSync(), // Извлекает плоский массив данных Float32Array
				shape: w.shape, // Сохраняет структуру (размеры) слоя
			}
		})
		// 2. Генерируем новые тензоры для ребенка на основе этих чисел внутри изолированного tidy
		const mutatedWeights = tf.tidy(() => {
			return rawWeightsData.map((raw) => {
				// Создаем чистый тензор из сохраненных чисел
				const parentTensor = tf.tensor(raw.data, raw.shape)

				if (rate === 0) return parentTensor // Для элиты возвращаем без изменений

				// Создаем шум и добавляем к родительскому тензору
				const noise = tf.randomNormal(raw.shape, 0, rate)
				return parentTensor.add(noise)
			})
		})
		// 3. Записываем мутировавшие тензоры в слои новой модели
		clonedModel.setWeights(mutatedWeights)

		// 4. Очищаем временные тензоры мутации из памяти
		mutatedWeights.forEach((t) => t.dispose())
		return new Brain(this.inputSize, this.hiddenSize, this.outputSize, clonedModel)
	}

	dispose() {
		if (this.model) {
			this.model.dispose()
		}
	}
}
