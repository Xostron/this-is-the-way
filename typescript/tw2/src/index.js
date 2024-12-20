const logger = require('./tool/winston')
const def = require('./tool/winston/def')

logger.log(def[1])
logger.log(def[2])
logger.log(def[3])
logger.log(def[4])
logger.log(def[5])
logger.log(def[6])

async function main() {
	let i = 6
	while (i > 0) {
		await actTimeout(def[i])
		i--
	}
}

function actTimeout(obj) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			logger.log(obj)
			resolve()
		}, 2000)
	})
}
