const winston = require('winston')
require('winston-daily-rotate-file')
const {  format, transports } = winston
const { combine, timestamp, json  } = format


// Пользовательские приоритеты
const custom = { levels: { error: 1, user: 2, state: 3, work: 4, all: 5 } }

// Фильтры
function filterLog(type) {
	return format((info, opts) => (info.level === type ? info : false))()
}

// Настройки для создания логов в файле
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

// Транспорт файлы для логгера
const filesRotate = templates.map((el) => new transports.DailyRotateFile(el))

const formatCombine = ()=>combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json())

module.exports = {custom, filesRotate, formatCombine}