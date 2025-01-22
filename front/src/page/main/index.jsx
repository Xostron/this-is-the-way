import Nav from '@cmp/nav'
import Footer from '@cmp/footer'
import List from './list'
import './style.css'

const Main = () => {
	const o = {
		// bld1: {
		// 	sec11: { low1: { date: 10, id: 20, code: 30 } },
		// 	sec12: { low2: { date: 10, id: 20, code: 30 } },
		// 	sec12: { low3: { date: 10, id: 20, code: 30 } },
		// },
		bld2: {
			sec21: { low4: { date: 10, id: 20, code: 30 } },
			sec22: { low5: { date: 10, id: 20, code: 30 } },
			sec23: { low6: { date: 10, id: 20, code: 30 } },
		},
		bld3: {
			low7: { date: 10, id: 20, code: 30 },
			low8: { date: 10, id: 20, code: 30 },
			low9: { date: 10, id: 20, code: 30 },
		},
	}

	const r = getKeys(o)
	console.log(111, 'result', r)

	console.log('main')
	return (
		<main className='page'>
			<div className='header'>1</div>
			<div className='content'>
				<List />
			</div>
			<div className='asidel'>3</div>
			<div className='asider'>4</div>
			<div className='footer'>5</div>
		</main>
	)
}

export default Main

function getKeys(o) {
	const keys = Object.keys(o)
	const r = []
	keys.forEach((k) => {
		if (typeof o[k] !== 'object') {
			return
		}

		r.push(k)
		r.push(getKeys(o[k]))
	})
	console.log(222, r)
	return r.length ? r : null
}
