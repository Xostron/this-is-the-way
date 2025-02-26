const { user } = require('@tool/auth/signup')
const ApiError = require('@tool/exceptions')
const mes = require('@dict/message')
const bcrypt = require('bcrypt')
const { generate, save } = require('@tool/token')

module.exports = function signin(db) {
	return async function (req, res, next) {
		try {
			const { login, password, token } = req.body
			const doc = await user(db, login)
			console.log(doc)
			if (!doc) throw mes[6]
			if (!doc?.on) throw mes[5]

			// Проверка пароля
			const ok = await bcrypt.compare(password, doc.password)
			if (!ok) throw mes[6]

			// Новый токен
			tokens = generate({ login: doc.login, id: doc._id, on: doc.on })

			// Сохранение рефреш токена
			await save(db, doc._id, tokens.refreshToken)

			// Добавляем рефреш токен в куки
			res.cookie('refreshToken', tokens.refreshToken, {
				maxAge: 30 * 60 * 1000, //30 мин
				httpOnly: true,
			})
			res.json({ result: 'ok', access: tokens.accessToken })
		} catch (error) {
			next(ApiError.BadRequest(error.toString()))
		}
	}
}
