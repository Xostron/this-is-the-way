const { createLogger } = require('winston')
const { custom, filesRotate, formatCombine } = require('./config')

/* Записывает логи по приоритету от 0 - высший приоритет, 4 - минимальный*/

// Создаем логгер
const logger = createLogger({
	levels: custom.levels,
	level: 'info',
	transports: [...filesRotate],
})

module.exports = logger
