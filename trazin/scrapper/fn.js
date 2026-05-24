const puppeteer = require('puppeteer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

/**
 * Сбор и сохранение ресурсов (статика) и html
 * @param {string} html Содержимое html страницы
 * @param {Object} page Страница
 * @param {Object} config Конфигурация
 */
async function collect(html, page, config) {
	// const resources = await page.evaluate(() => {
	// 	const r = []
	// 	document.querySelectorAll('script[src]').forEach((script) => {
	// 		r.push({
	// 			url: new URL(script.src, window.location.href).href,
	// 			type: 'js',
	// 			href: script.src,
	// 		})
	// 	})
	// 	return r
	// })

	await save(html, config.ph('index.html'))

    // await save(JSON.stringify(resources, null, ' '), config.ph('resource.json'))

	// Оптимизировано: скачиваем через fetch вместо тяжелого page.goto()
	// 	for (const resource of resources) {
	// 		try {
	// 			const res = await fetch(resource.url, {
	// 				headers: { 'User-Agent': userAgent }
	// 			})

	// 			if (res.ok) {
	// 				const arrayBuffer = await res.arrayBuffer()
	// 				const buffer = Buffer.from(arrayBuffer)

	// 				const urlObj = new URL(resource.url)
	// 				let fileName = path.basename(urlObj.pathname)

	// 				if (!fileName) {
	// 					fileName = `script_${Math.random().toString(36).substring(2, 7)}.js`
	// 				}

	// 				const filePath = path.join(config.dir, fileName)
	// 				await save(buffer, filePath)
	// 				console.log(`✅ Скачан: ${fileName}`)
	// 			} else {
	// 				console.error(`❌ Ошибка сервера ${res.status} для ${resource.url}`)
	// 			}
	// 		} catch (error) {
	// 			console.error(`❌ Ошибка скачивания ${resource.url}:`, error.message)
	// 		}
	// 	}
}

// сохранение файла
async function save(data, filename) {
	await fsp.writeFile(filename, data)
}

module.exports = { collect, save }
