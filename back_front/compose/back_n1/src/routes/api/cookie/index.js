const getCookie = require('./get')

function cookie(router, db) {
	router.get('/cookie', getCookie(db))
}

module.exports = cookie
