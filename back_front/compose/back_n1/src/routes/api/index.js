const express = require('express')
const router = express.Router()
const auth = require('./auth')
const file = require('./file')
const user = require('./user')
const cookie = require('./cookie')
const taskV1 = require('@service/task_v1/routes')

function api(db) {
	auth(router, db)
	file(router, db)
	user(router, db)
	cookie(router, db)
	taskV1(router, db)
	return router
}

module.exports = api
