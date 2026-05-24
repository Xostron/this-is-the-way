const puppeteer = require('puppeteer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

/**
 *
 * @param {string[]} data Массив ссылок
 * @returns {object[]} Массив рамы для обработки ссылок
 */
function fnConfig(data = []) {
	if (!data?.length) return null
	// Массив urls, индекс массива = название папки, куда будет сохранен результат скраппинга
	const r = data.map((url, i) => {
		// Создать папку с именем = i
		const dir = path.resolve(_dirname, '..', i)
		return {
			url,
			dir,
			// В эту папку сохраняем html
			ph: (filename) => path.resolve(dir, filename),
			// userAgent для pupeeter
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
		}
	})

	return r
}
module.exports = fnConfig
