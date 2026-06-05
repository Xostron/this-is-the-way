const fnConfig = require('../scrapper/config')
const fnHtml = require('../scrapper/html')


// Ссылка
const data = [
	'https://platform.21-school.ru/project/26558/task#part-7-nat',
]

main()

async function main() {
	const arr = fnConfig(data, 'DO1.html')
	let idx = 0
	for (const el of arr) {
		await fnHtml('school21', el, idx++)
	}
}
