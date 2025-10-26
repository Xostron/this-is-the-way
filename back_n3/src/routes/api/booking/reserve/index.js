const { db } = require('@tool/db/config')

function reserve() {
	return async function (req, res, next) {
		try {
			console.log('booking/reserve hello')
			res.status(200).json({ result: 12 })
		} catch (error) {
			console.log('booking/reserve error', error)
			res.status(400).json({ error })
		}
	}
}

module.exports = reserve
