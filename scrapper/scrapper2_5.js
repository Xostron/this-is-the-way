const puppeteer = require('puppeteer')

async function scrapeWebsite(url) {
	// Запуск браузера
	const browser = await puppeteer.launch({
		headless: false, // false для отладки, true для фонового режима
		slowMo: 100, // Замедление для наблюдения
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	})

	try {
		const page = await browser.newPage()

		// Установка размера окна
		await page.setViewport({ width: 1366, height: 768 })

		// Переход на страницу
		await page.goto(url, {
			waitUntil: 'networkidle2',
			timeout: 30000,
		})

		console.log('✅ Страница загружена')

		// Ожидание загрузки контента
		await page.waitForSelector('body', { timeout: 10000 })

		// Сбор данных
		const scrapedData = await page.evaluate(() => {
			// Сбор заголовка страницы
			const title = document.querySelector('title')?.textContent?.trim() || ''

			// Сбор всех ссылок
			const links = Array.from(document.querySelectorAll('a[href]'))
				.map((link) => ({
					text: link.textContent?.trim() || '',
					href: link.href || '',
				}))
				.filter((link) => link.href && link.text)

			// Сбор изображений
			const images = Array.from(document.querySelectorAll('img[src]')).map((img) => ({
				src: img.src,
				alt: img.alt || '',
				title: img.title || '',
			}))

			// Сбор заголовков
			const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(
				(heading) => ({
					tag: heading.tagName,
					text: heading.textContent?.trim() || '',
				})
			)

			return {
				title,
				links,
				images,
				headings,
				url: window.location.href,
			}
		})

		console.log('📊 Собранные данные:', scrapedData)
		return scrapedData
	} catch (error) {
		console.error('❌ Ошибка скраппинга:', error)
		throw error
	} finally {
		await browser.close()
	}
}

// Использование
scrapeWebsite('https://example.com')
	.then((data) => {
		console.log('✅ Скраппинг завершен успешно')
		console.log('Данные:', JSON.stringify(data, null, 2))
	})
	.catch((err) => {
		console.error('❌ Ошибка:', err)
	})
