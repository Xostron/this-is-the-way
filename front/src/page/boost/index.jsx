import { useEffect, useRef, useState } from 'react'
import List from './list'

const Boost = () => {
	// const [list, setList] = useState(rama)
	const [hide, setHide] = useState(true)
	const data = transform(hide, rama)
	return (
		<main className='page'>
			<button onClick={action}>Скрыть/Показать</button>
			<section className='content'>
				<List data={data} />
			</section>
		</main>
	)
	function transform(hide, rama) {
		return hide ? rama.filter((el) => !skip.includes(el.code)) : rama
	}
	function action() {
		setHide(!hide)
	}
}

export default Boost

const skip = ['a']

const rama = [
	{ code: 'a', list: [{ code: 't' }, { code: 'k' }] },
	{ code: 'b', list: [{ code: 't' }, { code: 'k' }] },
	{ code: 'c', list: [{ code: 't' }, { code: 'k' }] },
	{ code: 'd', list: [{ code: 't' }, { code: 'k' }] },
	{ code: 'e', list: [{ code: 't' }, { code: 'k' }] },
]

const values = {
	a: { t: 1, k: 2 },
	b: { t: 1, k: 2 },
	c: { t: 1, k: 2 },
	d: { t: 1, k: 2 },
	e: { t: 1, k: 2 },
}
