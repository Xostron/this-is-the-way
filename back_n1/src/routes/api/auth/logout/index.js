const { validateRefresh } = require('@tool/auth/token/fn')
const { remove } = require('../../../../tool/db')
const ApiError = require('@tool/exceptions')

module.exports = function logout(db) {
	return async function (req, res, next) {
		try {
			const refresh = req?.cookies?.refreshToken
			// const user = validateRefresh(refresh)
			remove(db, 'token', { refresh })
            res.clearCookie('refreshToken');
			res.json({ result: 'ok' })
		} catch (error) {
			next(ApiError.BadRequest(error.toString()))
		}
	}
}
