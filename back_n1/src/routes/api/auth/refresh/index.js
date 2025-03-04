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

			// Генерация новой пары токенов на основе doc
            // ротация токенов - продление жизни refresh token
			const tokens = await refreshAndSave(db, user, req, res)

			res.json({ accessToken: tokens.accessToken })
		} catch (error) {
			next(ApiError.BadRequest(error.toString()))
		}
	}
}
