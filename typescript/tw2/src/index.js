const logger = require('./tool/winston')
const def = require('./tool/winston/def')



// Периодически записываем данные в логи, каждую минуту лог файл автоматически удаляется
let c = 0
setInterval(() => {
	c++
	logger['error'](def[1])
	logger['user'](def[2])
	logger['state'](def[3])
	logger['work'](def[4])
	console.log(c)
}, 10000)
