const jwt = require('jsonwebtoken')
const { findAndModify } = require('@tool/db')

/**
 * Генерация токена
 * @param {*} payload данные о пользователе (основа токена)
 * @returns 
 */
function generate(payload) {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: process.env.ACCESSS_EXPIRE,
	})
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.REFRESH_EXPIRE,
	})
	return {
		accessToken,
		refreshToken,
	}
}

/**
 * Сохраняем токен в БД
 * @param {Object} db БД
 * @param {ObjectId} ownerId Ссылка на владельца
 * @param {String} refresh Новый рефреш токен
 * @param {String} old Старый токен
 */
async function save(db, ownerId, refresh, old) {
	try {
		const o = {
			ownerId,
			refresh,
			update: new Date(),
		}
		let q = { ownerId }
		if (old) q = { ownerId, refresh: old }
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
 * @returns {object} данные о пользователе
 */
function validateRefresh(token){
	try {
		const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
		return data
	} catch (error) {
		return null
	}
}

module.exports = { generate, save, validateRefresh }
