const winston = require('winston')
require('winston-daily-rotate-file')
const { createLogger, format, transports } = winston
const { combine, timestamp, json } = format

/* Записывает логи по приоритету от 0 - высший приоритет, 4 - минимальный*/
// Пользовательские приоритеты
const custom = { levels: { error: 1, user: 2, state: 3, work: 4, all: 5 } }
// Фильтры
function filterLog(type) {
	return format((info, opts) => (info.level === type ? info : false))()
}

// Шаблоны файлов логов
templates = [
	{
		filename: './data/error-%DATE%.log',
		datePattern: 'YYYY-MM-DD-HH',
		maxFiles: '1h',
		level: 'error',
		format: combine(filterLog('error')),
	},
	{
		filename: './data/user-%DATE%.log',
		datePattern: 'YYYY-MM-DD-HH',
		maxFiles: '1h',
		level: 'user',
		format: combine(filterLog('user')),
	},
	{
		filename: './data/state-%DATE%.log',
		datePattern: 'YYYY-MM-DD-HH',
		maxFiles: '1h',
		level: 'state',
		format: combine(filterLog('state')),
	},
	{
		filename: './data/work-%DATE%.log',
		datePattern: 'YYYY-MM-DD-HH',
		maxFiles: '1h',
		level: 'work',
		format: combine(filterLog('work')),
	},
	{
		filename: './data/all-%DATE%.log',
		datePattern: 'YYYY-MM-DD-HH',
		maxFiles: '1h',
		level: 'all',
	},
]
const filesRotateTransport = templates.map((el) => new transports.DailyRotateFile(el))

// Создаем логгер
const logger = createLogger({
	levels: custom.levels,
	level: 'info',
	format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
	transports: [...filesRotateTransport],
})

module.exports = logger
