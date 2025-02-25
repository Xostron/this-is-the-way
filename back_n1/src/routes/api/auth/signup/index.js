const {user, psw} = require('@tool/auth/signin')
const ApiError = require('@tool/exceptions')
const { insert } = require('@tool/tool/db')

module.exports = function signin(db) {
	return async function (req, res, next) {
		try {
			const { password1, password2, login } = req.body
			const now = new Date()
			// Проверка пароля пароль = повторите пароль
			if (password1 !== password2) throw new Error('Пароли не совпадают')
			// Проверка уникальности логина
			if (!login) throw new Error('Логин не введен')
			if (!await user(db, login)) throw new Error('Такой логин уже зарегистрирован')
			// Хеш пароля
			const hash = await psw(password1)
			// Регистрация
			const r = { login, password: hash, update: now, date: now }
			await insert(db, 'user', r)
			res.json({ result: 'ok' })
		} catch (error) {
            next(ApiError.BadRequest(error.toString()))
		}
	}
}
