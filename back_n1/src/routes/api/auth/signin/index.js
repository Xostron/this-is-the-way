const { user } = require('@tool/auth/signup')
const ApiError = require('@tool/exceptions')
const mes = require('@dict/message')
const bcrypt = require('bcrypt')
const refreshAndSave = require('@tool/auth/token')

module.exports = function signin(db) {
	return async function (req, res, next) {
		try {
            console.log(111, req.cookies?.refreshToken)
			const { login, password } = req.body
            // Поиск пользователя в БД 
			const doc = await user(db, login)
			if (!doc) throw mes[6]
			if (!doc?.on) throw mes[5]

			// Проверка пароля
			const ok = await bcrypt.compare(password, doc.password)
			if (!ok) throw mes[6]

			// Создание токенов
			const tokens = await refreshAndSave(db, doc, req, res)

			res.json({ result: 'ok', accessToken: tokens.accessToken })
		} catch (error) {
			next(ApiError.BadRequest(error.toString()))
		}
	}
}
