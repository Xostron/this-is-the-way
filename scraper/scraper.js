const puppeteer = require('puppeteer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

const config = {
	// url: 'https://muzofond.fm/',
	url: process.argv[3] ?? 'https://muzofond.fm/',
	keyword: process.argv[5] ?? 'XOSTRON',
	// Путь сохранения сайта
	dir: path.resolve(__dirname, 'front_temp'),
	ph: (filename) => path.resolve(__dirname, 'front_temp', filename),
}
console.log('URL =', config.url)
console.log('KEYWORD =', config.keyword)
downloadWebsite(config)

/**************************************************************************************** */
/**
 * Скачать и сохранить сайт
 * @param {*} config Данные для скачивания и сохранения сайта
 */
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
	const userAgent =
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
	try {
		if (!config.url) throw new Error('Не передан url', config.url)
		if (!fs.existsSync(config.dir)) {
			console.log(3, 'Создаем папку куда сохраним сайт', config.dir)
			fs.mkdirSync(config.dir)
		}
		const page = await browser.newPage()
		// Переход на страницу html
		await page.setUserAgent(userAgent)
		await page.goto(config.url, { waitUntil: 'networkidle2', timeout: 30000 })
		// Скачивание HTML
		let html = await page.content()
		// Добавляем в тэги keyword
		html = autoreplace(html, config.keyword)
		// Сбор и сохранение ресурсов (статика) + преписываем пути статики в html
		await collect(html, page, config.url)
		console.log('✅Сайт полностью скачан')
	} catch (err) {
		console.log(err)
		await browser.close()
	} finally {
		await browser.close()
	}
}

/**
 * Сбор и сохранение ресурсов (статика) + переписываем пути статики в html
 * @param {string} html Содержимое html страницы
 * @param {Object} page Страница
 * @param {string} url Ссылка на сайт
 */
async function collect(html, page, url) {
	const resources = await page.evaluate(() => {
		const r = []
		// Собираем все ссылки на CSS
		document
			.querySelectorAll('link[rel="stylesheet"][href], link[rel="stylesheet preload"]')
			.forEach((link) => {
				r.push({
					url: new URL(link.href, window.location.href).href,
					type: 'css',
					href: link.href,
				})
			})
		// Собираем все скрипты
		document.querySelectorAll('script[src]').forEach((script) => {
			r.push({
				url: new URL(script.src, window.location.href).href,
				type: 'js',
				href: script.src,
			})
		})
		// Собираем все изображения
		document.querySelectorAll('img[src]').forEach((img) => {
			r.push({
				url: new URL(img.src, window.location.href).href,
				type: 'image',
				href: img.src,
			})
		})
		// Собираем шрифты
		document.querySelectorAll('link[rel="preload"][as="font"]').forEach((link) => {
			if (link.href) {
				r.push({
					url: new URL(link.href, window.location.href).href,
					type: 'font',
					href: link.href,
				})
			}
		})
		return r
	})
	// Переписываем пути статики в html
	html = replaceHref(html, resources, url)
	// Сохраняем html
	await save(html, config.ph('index.html'))
	console.log('✅HTML после автозамены путей и вставик keyword сохранен')
	// Сохраняем ресурсы (для проверки)
	// await save(JSON.stringify(resources, null, ' '), config.ph('resource.json'))
	// Скачивание и сохранение всех ресурсов
	for (const resource of resources) {
		try {
			const response = await page.goto(resource.url, { waitUntil: 'domcontentloaded' })
			if (response && response.ok()) {
				const buffer = await response.buffer()
				const fileName = path.basename(new URL(resource.url).pathname)
				const filePath = path.join(config.dir, fileName)
				await save(buffer, filePath)
				console.log(`✅Скачан: ${fileName}`)
			}
		} catch (error) {
			console.error(`❌Ошибка скачивания ${resource.url}:`, error.message)
		}
	}
}

/**
 * Переписываем пути статики в html
 * @param {string} html Содержимое html страницы
 * @param {object[]} resources Ресурсы сайта (статика)
 * @param {string} url Ссылка на сайт
 * @returns
 */
function replaceHref(html, resources, url) {
	let result = html
	resources.forEach((el) => {
		const href = el.href.split('/').pop()
		el.href = el.href.replace(url, '/')
		if (el.href.startsWith('data:image/')) return
		// TODO replaceValue = '/' или './'
		else result = result.replace(el.href, '/' + href)
	})
	return result
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

/**
 * Вставка ключевого слова в тэг
 * @param {string} html Сожредимое страницы html
 * @param {string} tag Тэг html
 * @param {string} keyword Ключевое слово
 * @param {boolean} rdm Режим рандомной вставки ключевого слова (true - с проверкой вероятности вставки, false - всегда вставлять)
 * @returns {string} html c ключевыми словами
 */
function paste(html, tag, keyword, rdm = false) {
	let cursor = html
	let result = ''
	while (true) {
		// Первое вхождение
		const idxStart = cursor.indexOf(tag)
		if (idxStart === -1) return result + cursor
		result += cursor.slice(0, idxStart)
		cursor = cursor.slice(idxStart, cursor.length)
		// Завершающее вхождение
		const idxEnd =
			tag !== `alt='` && tag !== `alt="`
				? cursor.indexOf('>')
				: tag === `alt="`
				? cursor.indexOf(`"`)
				: cursor.indexOf(`'`)
		if (idxEnd === -1) {
			result += cursor
			continue
		}
		const sub = cursor.slice(0, idxEnd + 1)
		cursor = cursor.slice(idxEnd + 1, cursor.length)
		// Если рандомная вставка включена
		if (rdm) {
			if (random()) result += sub + keyword
			else result += sub
		}
		// Вставка в тэг
		else result += sub + keyword
		if (!cursor.length) return result + cursor
	}
}

/**
 * Проверка вероятности вставки
 * результат орел (>=50) или решка (<50%)
 * @returns {boolean} true - вставляем, false - нет
 */
function random() {
	const min = 0,
		max = 10
	const r = Math.trunc(Math.random() * (max - min) + min)
	return r >= max / 2 ? true : false
}
