const html = `
<head></head>
<title className=''>awea</title>
<h1>asd</h1>
<p data-id></p>
<span></span>
<li></li>
<img classname='' alt=''/>
<title className=''></title>
<h1></h1>
<p data-id></p>
<span> </span>
<li alt='asds'></li>
<img classname='' alt=''/>
`
const keyword = 'XOSTRON'

function autoreplace(html, keyword) {
	if (!keyword) return html
	const all = ['<title', '<h1']
	const partly = ['<p', '<span', '<li', `alt='`, `alt="`]
	let result = html

	all.forEach((el) => (result = paste(result, el, keyword)))
	partly.forEach((el) => (result = paste(result, el, keyword, true)))
	return result
}

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
