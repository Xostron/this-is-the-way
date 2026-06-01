// const save = require('./save')

/**
 * Извлечение из html ссылки промокодов
 * @param {*} config
 * @param {*} page
 * @returns {String[]} Массив ссылок
 */
async function dsHtmlPromo(config, page, mode) {
	// Получение html товара
	const html = await page.content()
	// Извлечь из html_text ссылки с промо
	const arr = extractYandexLinks(html)
	return arr
}

module.exports = dsHtmlPromo

function extractYandexLinks(text) {
	// Регулярное выражение ищет подстроку и захватывает всё до кавычки
	const regex = /https:\/\/market\.yandex\.ru\/search\?shopPromoId=[^"\s]+/g

	// Возвращает массив найденных ссылок или пустой массив, если ничего не найдено
	return text.match(regex) || []
}
