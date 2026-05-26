const save = require('./save')

/**
 * Получение и Сохранение html
 * @param {*} config
 * @param {*} page
 * @param {*} mode
 * @returns
 */
async function dsHtml(config, page, mode) {
	if (mode) return

	const html = await page.content()
	// Извлечь из html_text ссылки с промо
	const arr = extractYandexLinks(html)
	// Если пусто, то не сохраняем
	if (!arr.length) return
	//  html
	// await save(html, config.ph(`index${config.id}.html`))
	await save(JSON.stringify({ ...arr }, null, ''), config.ph(`index${config.id}.json`))
}

module.exports = dsHtml

function extractYandexLinks(text) {
	// Регулярное выражение ищет подстроку и захватывает всё до кавычки
	const regex = /https:\/\/market\.yandex\.ru\/search\?shopPromoId=[^"\s]+/g

	// Возвращает массив найденных ссылок или пустой массив, если ничего не найдено
	return text.match(regex) || []
}
