const ApiError = require('@tool/exceptions')
const { validateRefresh } = require('@tool/auth/token/fn')
const { ObjectID } = require('mongojs')
const { findOne } = require('@tool/db')
const refreshAndSave = require('@tool/auth/token')

module.exports = function refresh(db) {
	return async function (req, res, next) {
		try {
			// рефреш токен из кук
			const refresh = req.cookies?.refreshToken
			if (!refresh) return next(ApiError.Unauthorized(9))

			// Данные о пользователе (дешифрация токена)
			const doc = validateRefresh(refresh)
			if (!doc) return next(ApiError.Unauthorized(10))

			// Поиск пользователя
			const user = await findOne(db, 'user', { _id: ObjectID(doc._id) })
			if (!user) return next(ApiError.Unauthorized(11))

			// Создание токенов
			const tokens = await refreshAndSave(db, user, req, res)

			res.json({ result: 'ok', accessToken: tokens.accessToken, user: tokens.user })
		} catch (error) {
			next(ApiError.BadRequest(error.toString()))
		}
	}
}
