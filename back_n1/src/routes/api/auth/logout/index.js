module.exports = function logout(db) {
	return async function (req, res, next) {
		try {
			res.json({ result: 'ok' })
		} catch (error) {
			next(ApiError.BadRequest(error.toString()))
		}
	}
}
