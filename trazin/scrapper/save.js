const fsp = require('fs').promises

// сохранение файла
async function save(data, filename) {
	await fsp.writeFile(filename, data)
}

module.exports = save
