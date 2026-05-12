const make = require('../make')
const readTCP = require('./read_tcp')

/**
 * Чтение модулей
 * @param {*} arr Массив модулей
 * @returns {Promise<object>} Объект: ключ-id модуля, значение-массив показаний модуля
 */
async function read(arr) {
	try {
		const data = {}
		for (let i = 0; i < arr.length; i++) {
			// Чтение
			let v = await readTCP(arr[i].ip, arr[i].port, arr[i])

			// Пауза перед опросом следующего модуля (без этой паузы модули читаются не стабильно)
			await pause(100)
			data[arr[i].ip] = v
		}
		return data
	} catch (error) {
		console.error('ERROR', error)
	}
}

// Пауза
function pause(n) {
	return new Promise((res) => setTimeout(res, n))
}

module.exports = read
