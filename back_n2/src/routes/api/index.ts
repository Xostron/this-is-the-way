import express from 'express'
const router = express.Router()
import user from './user'
import auth from './auth'

function api() {
    auth(router)
	user(router)
	return router
}

export default api
