function isAuth(db) {
	return (req, res, next) => {
		return next()
	}
}

module.exports = isAuth
