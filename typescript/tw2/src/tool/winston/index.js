const { createLogger, format, transports } = require('winston')

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



module.exports = logger