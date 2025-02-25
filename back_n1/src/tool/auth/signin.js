const bcrypt = require('bcrypt')
const { findOne } = require('../db')

async function user(db, login) {
	try {
		const r = await findOne(db, 'user', { login })
		return r
	} catch (error) {
		console.log(error)
	}
}

async function psw(password) {
	try {
		const r = await bcrypt.hash(password, 3)
		return r
	} catch (error) {
		console.log(error)
	}
}

module.exports = { user, psw }
