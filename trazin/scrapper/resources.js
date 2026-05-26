const save = require("./save")


/**
 * Поиск скриптов и сохранение
 * @param {*} page
 */
async function fnscript(page, config) {
	const resources = await page.evaluate(() => {
		// Поиск скриптов
		const anchors = document.querySelectorAll('script[src]')

		// Создаем ссылки на скачивание скриптов
		const resources = anchors.map((script) => ({
			url: new URL(script.src, window.location.href).href,
			type: 'js',
			href: script.src,
		}))
	})
	// Сохранение найденных ссылок
	await save(JSON.stringify(resources, null, ' '), config.ph('resources.json'))

	const userAgent =
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

	// Оптимизировано: скачиваем через fetch вместо тяжелого page.goto()
	for (const resource of resources) {
		try {
			const res = await fetch(resource.url, {
				headers: { 'User-Agent': userAgent },
			})

			if (res.ok) {
				const arrayBuffer = await res.arrayBuffer()
				const buffer = Buffer.from(arrayBuffer)

				const urlObj = new URL(resource.url)
				let fileName = path.basename(urlObj.pathname)

				if (!fileName) {
					fileName = `script_${Math.random().toString(36).substring(2, 7)}.js`
				}

				const filePath = path.join(config.dir, fileName)
				await save(buffer, filePath)
				console.log(`✅ Скачан: ${fileName}`)
			} else {
				console.error(`❌ Ошибка сервера ${res.status} для ${resource.url}`)
			}
		} catch (error) {
			console.error(`❌ Ошибка скачивания ${resource.url}:`, error.message)
		}
	}
}

module.exports = fnscript