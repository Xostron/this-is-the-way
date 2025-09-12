const puppeteer = require('puppeteer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

const config = {
	// Сайт для скачивания (скачивает только HTML)
	url: 'https://muzofond.fm/',
	// url: process.argv[3],
	keyword: process.argv[5] ?? 'XOSTRON',
	// Путь сохранения сайта
	dir: path.resolve(__dirname, 'front_temp'),
	ph: (filename) => path.resolve(__dirname, 'front_temp', filename),
}
console.log(1, config.url)
console.log(2, config.keyword)
downloadWebsite(config)

async function downloadWebsite(config) {
	const browser = await puppeteer.launch({
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--single-process', // опционально, для легковесных сред
		],
	})
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
	try {
		if (!config.url) throw new Error('Не передан url', config.url)
		if (!fs.existsSync(config.dir)) {
			console.log(3, 'Создаем папку для сайта front', config.dir)
			fs.mkdirSync(config.dir)
		}
		const page = await browser.newPage()

		// Переход на страницу html
        await page.setUserAgent(userAgent);
		await page.goto(config.url, { waitUntil: 'networkidle2', timeout: 30000 })
		// Скачивание HTML
		let html = await page.content()
		html = autoreplace(html, config.keyword)
		await save(html, config.ph('index.html'))
		console.log('✅ HTML сохранен')

		// Сбор и сохранение ресурсов (статика)
		await collect(page)

		console.log('✅ Сайт полностью скачан')
	} catch (err) {
		console.log(err)
		await browser.close()
	} finally {
		await browser.close()
	}
}

// Сбор и сохранение ресурсов (статика)
async function collect(page) {
	const result = await page.evaluate(() => {
		const resources = []
		// Собираем все ссылки на CSS
		document.querySelectorAll('link[rel="stylesheet"][href]').forEach((link) => {
			resources.push({
				url: new URL(link.href, window.location.href).href,
				type: 'css',
			})
		})
		// Собираем все скрипты
		document.querySelectorAll('script[src]').forEach((script) => {
			resources.push({
				url: new URL(script.src, window.location.href).href,
				type: 'js',
			})
		})
		// Собираем все изображения
		document.querySelectorAll('img[src]').forEach((img) => {
			resources.push({
				url: new URL(img.src, window.location.href).href,
				type: 'image',
			})
		})
		// Собираем шрифты
		document.querySelectorAll('link[rel="preload"][as="font"], link[rel="stylesheet"]').forEach((link) => {
			if (link.href) {
				resources.push({
					url: new URL(link.href, window.location.href).href,
					type: 'font',
				})
			}
		})
		return resources
	})
	await save(JSON.stringify(result, null, ' '), config.ph('resource.json'))
	// Скачивание и сохранение всех ресурсов
	for (const resource of result) {
		try {
			const response = await page.goto(resource.url, { waitUntil: 'domcontentloaded' })
			if (response && response.ok()) {
				const buffer = await response.buffer()
				const fileName = path.basename(new URL(resource.url).pathname)
				const filePath = path.join(config.dir, fileName)
				await save(buffer, filePath)
				console.log(`✅ Скачан: ${fileName}`)
			}
		} catch (error) {
			console.error(`❌ Ошибка скачивания ${resource.url}:`, error.message)
		}
	}
}
// сохранение файла
async function save(data, filename) {
	await fsp.writeFile(filename, data)
}

//Добавляем в теги keyword
function autoreplace(html, keyword) {
	if (!keyword) return html
	const all = ['<title ', '<h1 ']
	const partly = ['<p ', '<span ', '<li ', `alt='`, `alt="`]
	let result = html
	// Строгое добавление
	all.forEach((el) => (result = paste(result, el, keyword)))
	// Рандомное добавление
	partly.forEach((el) => (result = paste(result, el, keyword, true)))
	return result
}
// По тэгу
function paste(html, tag, keyword, rdm = false) {
	let cursor = html
	let result = ''

	while (true) {
		// Первое вхождение
		const idxStart = cursor.indexOf(tag)
		if (idxStart === -1) return result + cursor

		result += cursor.slice(0, idxStart)
		cursor = cursor.slice(idxStart, cursor.length)
		// console.log(1, result)
		// console.log(2, cursor)
		// Завершающее вхождение
		const idxEnd = tag !== `alt='` && tag !== `alt="` ? cursor.indexOf('>') : tag === `alt="` ? cursor.indexOf(`"`) : cursor.indexOf(`'`)
		if (idxEnd === -1) {
			result += cursor
			continue
		}
		const sub = cursor.slice(0, idxEnd + 1)
		// console.log(3, sub)
		cursor = cursor.slice(idxEnd + 1, cursor.length)
		if (rdm) {
			if (random()) result += sub + keyword
			else result += sub
		} else result += sub + keyword

		if (!cursor.length) return result + cursor
	}
}

/**
 *результат орел (>=50) или решка (<50%)
 * @returns boolean | number
 */
function random() {
	const min = 0,
		max = 10
	const r = Math.trunc(Math.random() * (max - min) + min)
	return r >= max / 2 ? true : false
}
