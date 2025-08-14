const express = require('express')
const router = express.Router()
const auth = require('./auth')
const file = require('./file')
const user = require('./user')
const cookie = require('./cookie')

function api(db) {
	auth(router, db)
	file(router, db)
	user(router, db)
	cookie(router, db)
	return router
}

module.exports = api
