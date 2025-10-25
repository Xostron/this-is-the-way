import { useEffect } from 'react'

function Dom() {
	// Создать элемент и добавить его к родителю
	useEffect(() => {
		// Прочитать
		const el1: HTMLSpanElement | null = document.querySelector('#id-test')
		console.log('el1', el1?.title)
		// Создать элемент
		const span = document.createElement('span')
		if (el1) {
			// Добавить в родителя
			el1.appendChild(span)
			// Изменить родителя
			el1.innerHTML = '<article>Test+</article>'
			el1.title = 'asd'
			el1.dataset.qwe = '123'
			el1.classList.add('dom-test')
			el1.style.fontSize = '30px'
		}
	}, [])

	// Advanced API ResizeObserver
	useEffect(() => {
		const main: HTMLElement | null = document.querySelector('#id-dom-main')
		const el2: HTMLSpanElement | null = document.querySelector('.dom-span')
		const resize = new ResizeObserver((entries) => {
			console.log('entries', entries[0])
			if (el2) el2.style.fontSize = (entries?.[0]?.contentRect?.width ?? 100) / 10 + 'px'
		})
		console.log('resize', resize)
		console.log('main', main)
		console.log('el2', el2)
		if (main) resize.observe(main)

		return () => {
			console.log('cleanup resize')
			if (main) resize.unobserve(main)
		}
	}, [])

	return (
		<main id='id-dom-main'>
			<div id='id-test' title='hi'>
				test
			</div>
			<span className='dom-span' id='id-dom-span'>
				DOM
			</span>
		</main>
	)
}

export default Dom
