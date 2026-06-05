const def = require('./def')

async function fnHtml(code, cfg, idx) {
	if (!def?.[code]) return console.log(`Задачи HTML с кодом [${code}] не существует`)
	await def[code](cfg, idx)
}

module.exports = fnHtml
