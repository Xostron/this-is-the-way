const { user, psw } = require('@tool/auth/signup')
const ApiError = require('@tool/exceptions')
const { insert } = require('@tool/db')
const mes = require('@dict/message')
module.exports = function signin(db) {
	return async function (req, res, next) {
		try {
			const { password1, password2, login } = req.body
			const now = new Date()
			// Проверка пароля
			if (password1 !== password2) throw mes[1]
			// Проверка уникальности логина
			if (!login) throw mes[2]
			if (await user(db, login)) throw mes[3]
			// Хеш пароля
			const hash = await psw(password1)
			// Регистрация
			const r = { login, password: hash, on: true, update: now, date: now }
			await insert(db, 'user', r)
			res.json({ result: 'ok' })
		} catch (error) {
			next(ApiError.BadRequest(error.toString()))
		}
	}
}
