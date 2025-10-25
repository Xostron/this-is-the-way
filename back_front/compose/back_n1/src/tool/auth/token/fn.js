const jwt = require('jsonwebtoken')
const { findAndModify } = require('@tool/db')

/**
 * Генерация токена
 * access token - используется клиентом для доступа к закрытм роутерам,
 * по истечению acess token, сообщает клиенту ошибку 401 Unathorized,
 * клиент инициализирует запрос на refresh token, если он валиден,
 * то - обновляется пара токенов,
 * иначе - 401 Unathorized (необходимо заново войти в систему)
 *
 * refresh token - используется для обновления access token, может быть отозван
 * при выходе пользователя из системы logout,
 * если refresh token не валиден при logout,
 * то сервер отвечает клиенту - ok (клиент очищает свое хранилише)
 * и ничего не делает по удлаению из БД рефреш токена
 * @param {object} payload данные о пользователе (основа токена)
 * @returns {object}
 */
function generate(payload) {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: process.env.ACCESSS_EXPIRE ?? '5m',
	})
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.REFRESH_EXPIRE ?? '30m',
	})
	return {
		accessToken,
		refreshToken,
	}
}

/**
 * Сохраняем токен в БД
 * @param {Object} db БД
 * @param {Object} ownerId Ссылка на владельца
 * @param {String} refresh Новый рефреш токен
 * @returns {Promise} Сохраняемый документ из коллекции
 */
async function save(db, ownerId, refresh) {
	try {
		const o = {
			ownerId,
			refresh,
			update: new Date(),
		}
		const q = { ownerId }
		const r = await findAndModify(db, 'token', q, (upd = o), (upsert = true), (n = true))
		return r
	} catch (error) {
		console.log(error)
	}
}

/**
 * Валидация рефреш токена
 * Дешифровка
 * @param {string} token
 * @returns {object} Данные о пользователе { _id, login, on, deviceId }
 */
function validateRefresh(token) {
	try {
		const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
		// Токен валиден
		return data
	} catch (error) {
		// Токен недействителен
		return null
	}
}

module.exports = { generate, save, validateRefresh }
