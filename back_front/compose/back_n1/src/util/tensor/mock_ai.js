const mock = {
	tprd: 10,
	hin: 50,
	tout: 5,
	hout: 30,
	automode: 'хранение',
}
module.exports = mock

const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path')
const fileLog = path.join(__dirname, 'sensLog.log')
const fileJson = path.join(__dirname, 'sensJson.JSON')
const readline = require('readline')



function read(filename) {
	return new Promise((resolve, reject) => {
		fsp.readFile(filename, 'utf8')
			.then((r) => {
				resolve(r)
			})
			.catch((err) => {
				resolve(null)
				console.error('1 Error:', err)
			})
	})
}

