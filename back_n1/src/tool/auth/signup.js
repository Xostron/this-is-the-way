const bcrypt = require('bcrypt')
const { findOne } = require('../db')

/**
 * Проверка уникальности логина
 * @param {*} db ссылка на БД
 * @param {*} login 
 * @returns 
 */
async function user(db, login) {
	try {
		const r = await findOne(db, 'user', { login })
		return r
	} catch (error) {
		console.log(error)
	}
}

/**
 * Получить хэш пароля
 * @param {*} password 
 * @returns 
 */
async function psw(password) {
	try {
		const r = await bcrypt.hash(password, 3)
		return r
	} catch (error) {
		console.log(error)
	}
}

module.exports = { user, psw }
