const fsp = require('fs').promises

/**
 * Сбор и сохранение ресурсов (статика) и html
 * @param {string} html Содержимое html страницы
 * @param {Object} page Страница
 * @param {Object} config Конфигурация
 */
async function collect(html, page, config, mode = false) {
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
	const cards = mode ? await fnCards(page) : null
	await save(html, config.ph('index.html'))
	mode ? await save(JSON.stringify(cards, null, ' '), config.ph('cards.json')) : null
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

async function fnCards(page) {
	const cards = await page.evaluate(() => {
		// Находим все ссылки, у которых href начинается с '/card/'
		const anchors = document.querySelectorAll('a[href^="/card/"]')

		return Array.from(anchors)
			.map((anchor) => anchor.href) // Автоматически превратит относительный URL в полный
			.filter((url, index, self) => self.indexOf(url) === index) // Удалит дубликаты
	})
	return cards
}

module.exports = { collect, save }


async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        const distance = 300; // Увеличили шаг, чтобы скроллить быстрее
        const duration = 2 * 60 * 1000; // 2 минуты в миллисекундах
        const startTime = Date.now();
  
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
  
          // Проверяем, прошло ли 2 минуты
          if (Date.now() - startTime >= duration) {
            clearInterval(timer);
            resolve();
          }
        }, 150); // Интервал между скроллами
      });
    });
  }