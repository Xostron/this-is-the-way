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

function paste(html, tag, keyword, random = false) {
	let cursor = html
	let result = ''
	console.log(555, keyword)
	while (true) {
		// Первое вхождение
		const idxStart = cursor.indexOf(tag)
		if (idxStart === -1) return result + cursor

		result += cursor.slice(0, idxStart)
		cursor = cursor.slice(idxStart, cursor.length)
		console.log(1, result)
		console.log(2, cursor)
		// Завершающее вхождение
		const idxEnd =
			tag !== `alt='` || tag !== `alt="`
				? cursor.indexOf('>')
				: tag === `alt="`
				? cursor.indexOf(`"`)
				: cursor.indexOf(`'`)
		if (idxEnd === -1) {
			result += cursor
			continue
		}
		const sub = cursor.slice(0, idxEnd + 1)
		console.log(3, sub)
		cursor = cursor.slice(idxEnd + 1, cursor.length)
		console.log(4, cursor)
		result += sub + keyword
		console.log(5, result)

		if (!cursor.length) return result + cursor
	}
}

console.log(111, autoreplace(html, keyword))
