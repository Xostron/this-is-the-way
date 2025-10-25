const { validateRefresh } = require('@tool/auth/token/fn')
const { remove } = require('../../../../tool/db')
const ApiError = require('@tool/exceptions')

module.exports = function logout(db) {
	return async function (req, res, next) {
		try {
			const refresh = req?.cookies?.refreshToken
			const user = validateRefresh(refresh)
			// Рефреш токен не валиден: истек срок, подделан (не совпадает)
			if (!user) {
				res.json({ result: 'ok' })
				return
			}
			// Токен валиден - удаляем из БД
			await remove(db, 'token', { refresh })
			// Очистка куки (клиент при получении ответа, должен очистить хранилище с токеном)
			res.clearCookie('refreshToken')
			res.json({ result: 'ok' })
		} catch (error) {
			next(ApiError.BadRequest(error.toString()))
		}
	}
}
