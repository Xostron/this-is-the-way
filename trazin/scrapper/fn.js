const fnCards = require('./card')


/**
 * Сбор и сохранение ресурсов (статика) и html
 * @param {string} html Содержимое html страницы
 * @param {Object} page Страница
 * @param {Object} config Конфигурация
 */
async function collect(page, config, mode = false) {
	if (!mode) return

	// Поиск ссылок в каталоге и сохранение в cards.json
	await fnCards(page, config)
}

module.exports = { collect }
