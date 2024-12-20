const { createLogger, format, transports } = require('winston')

const def = {
	1: {
		// timestamp: new Date(),
		owner: 1,
		value: true,
		message: 'Без лвл',
	},
	2: {
		// timestamp: new Date(),
		owner: 1,
		value: true,
		message: 'info',
		level: 'info',
	},
	3: {
		// timestamp: new Date(),
		owner: 1,
		value: true,
		message: 'error',
		level: 'error',
	},
	4: {
		// timestamp: new Date(),
		owner: 1,
		value: true,
		message: 'user',
		level: 'user',
	},
	5: {
		// timestamp: new Date(),
		owner: 1,
		value: true,
		message: 'mech',
		level: 'mech',
	},
	6: {
		// timestamp: new Date(),
		owner: 1,
		value: true,
		message: 'sensor',
		level: 'sensor',
	},
}

/* Записывает логи по приоритету от 0 - высший приоритет, 4 - минимальный
поэтому получается:
error 0 - содержит сообщения с уровнем error.
user: 1 - содержит сообщения с уровнем error и user.
mech: 2 - содержит сообщения с уровнем error, user, mech.
sensor: 3 - содержит сообщения с уровнем error, user, mech, sensor.
info: 4 - содержит все сообщения
*/

// Пользовательские приоритеты
const custom = { levels: { error: 0, user: 1, mech: 2, sensor: 3, info: 4 } }

// Создаем логгер
const logger = createLogger({
	levels: custom.levels,
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { pcId: 12, buildingId: 12 },
	transports: [
		new transports.File({ filename: './data/error.log', level: 'error' }),
		new transports.File({ filename: './data/user.log', level: 'user' }),
		new transports.File({ filename: './data/mech.log', level: 'mech' }),
		new transports.File({ filename: './data/sensor.log', level: 'sensor' }),
		new transports.File({ filename: './data/info.log', level: 'info' }),
	],
})

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
