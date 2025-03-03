import Nav from '@cmp/nav'
import Footer from '@cmp/footer'
import List from './list'
import './style.css'
import Card from '@cmp/card'

const Main = () => {
	console.time('all')
	all(obj, data)
	console.timeEnd('all')

	console.log(111, obj)

	console.time('get')
	const r = getKeys(obj)
	console.timeEnd('get')

	console.log(222, r)

	return (
		<main className='page'>
			<section className='header'>1</section>
			<section className='content'>
				<h1>2</h1>
				<List />
				<section className='list-card'>
					{new Array(20).fill(0).map((el, i) => (
						<article className='card' key={i}>
							<h1>Title {i}</h1>
							<p className='card-text'>asdas asdasd</p>
							<button className='card-btn'>Кнопка</button>
						</article>
					))}
				</section>
				<section className='cmp-card-list'>
					{[
						{
							title: 'Warhammer',
							text: 'Сайфер',
							tab: [
								{ id: 1, name: 1 },
								{ id: 2, name: 2 },
								{ id: 3, name: 3 },
								{ id: 4, name: 4 },
								{ id: 5, name: 5 },
							],
						},
						{
							title: 'Warhammer',
							text: 'Сайфер',
							tab: [
								{ id: 1, name: 1 },
								{ id: 2, name: 2 },
								{ id: 3, name: 3 },
							],
						},
						{
							title: 'Warhammer',
							text: 'Сайфер',
							tab: [{ id: 1, name: 1 }],
						},
						{
							title: 'Warhammer',
							text: 'Сайфер',
							tab: [],
						},
					].map((el, i) => (
						<Card card={el} key={i} />
					))}
				</section>
			</section>
			<section className='asidel'>3</section>
			<section className='asider'>4</section>
			<section className='footer'>5</section>
		</main>
	)
}

export default Main

// (рекурсия) Получить ключи объекта
function getKeys(o) {
	const keys = Object.keys(o)
	const r = []
	keys.forEach((k) => {
		if (typeof o[k] !== 'object') return
		const rr = getKeys(o[k])?.filter((el) => el)
		const t = { key: k }
		rr ? (t.nest = rr) : null
		r.push(t)
	})
	return r.length ? r : null
}

/**
 * obj - актуальные аварии, data - сохраненые аварии
 * Поиск пересечения между двумя объектами, результат мутированный obj,
 * в котором пересечения копируются из data
 * @param {*} data данные из файла (слудующая вложенность)
 * @param {*} obj данные из итерации (следующая вложенность)
 * @param {*} prev данные из итерации (предыдущая вложенность)
 * @param {*} key предыдущий ключ
 * @returns
 */
function all(obj, data, prev, key) {
	const keys = Object.keys(obj)
	// console.log(111, key, obj, keys)
	for (const k of keys) {
		// Ключ есть в файле (пересечение obj c data)
		if (k in data) {
			if (typeof obj[k] !== 'object') {
				// console.log(555, key, prev, data)
				prev[key] = data
				return
			}
			// console.log(444, k, obj)
			all(obj[k], data[k], obj, k)
		}
	}
}

const data = {
	// полное совпадение
	bld1: {
		sec11: { low1: { date: 11, id: 21, code: 31 } },
		sec12: { low2: { date: 12, id: 22, code: 32 } },
		sec13: { low3: { on: { date: 13, id: 23, code: 33 } } },
	},
	// частичное
	bld2: {
		// sec21: { low4: { date: 10, id: 20, code: 30 } },
		// sec22: { low5: { date: 10, id: 20, code: 30 } },
		sec23: {
			low6: { date: 1, id: 2, code: 3 },
			low7: { date: 1, id: 2, code: 3 },
		},
	},
	// ключи совпадают - значение нет
	bld3: {
		low7: { date: 1, id: 2, code: 3 },
		low8: { date: 4, id: 5, code: 6 },
		low9: { date: 7, id: 8, code: 9 },
	},
	// Полное не совпадение
	bld4: {
		sec11: { low1: { date: 10, id: 20, code: 30 } },
		sec12: { low2: { date: 10, id: 20, code: 30 } },
		sec12: { low3: { date: 10, id: 20, code: 30 } },
	},
	// bld 5 совпадает - отсальное нет
	bld5: {
		sec11: { low1: { date: 10, id: 20, code: 30 } },
		sec12: { low2: { date: 10, id: 20, code: 30 } },
		sec12: { low3: { date: 10, id: 20, code: 30 } },
	},
	// bld6, sec1 совпадает, остальное нет
	bld6: {
		sec11: { low1: { date: 10, id: 20, code: 30 } },
		// sec12: { low2: { date: 10, id: 20, code: 30 } },
		// sec12: { low3: { date: 10, id: 20, code: 30 } },
	},
	// bld7, sec1, low1 совпадает
	bld7: {
		sec11: {
			low1: { date: 0, id: 20, code: 30 },
			low21: { date: 110, id: 20, code: 30 },
		},
		// sec12: { low2: { date: 10, id: 20, code: 30 } },
		// sec12: { low3: { date: 10, id: 20, code: 30 } },
	},
}
const obj = {
	// полное совпадение
	bld1: {
		sec11: { low1: { date: 10, id: 20, code: 30 } },
		sec12: { low2: { date: 10, id: 20, code: 30 } },
		sec13: {
			low3: { on: { date: 1, id: 2, code: 3 } },
			low4: { date: 10, id: 20, code: 30 },
		},
	},
	// частичное
	bld2: {
		sec21: { low4: { date: 10, id: 20, code: 30 } },
		sec22: { low5: { date: 10, id: 20, code: 30 } },
		sec23: {
			low6: { date: 10, id: 20, code: 30 },
			low3: { date: 10, id: 20, code: 30 },
		},
	},
	// ключи совпадают - значение нет
	bld3: {
		low7: { date: 11, id: 21, code: 31 },
		low8: { date: 41, id: 51, code: 61 },
		low9: { date: 71, id: 81, code: 91 },
	},
	// Полное не совпадение - новый
	bld8: {
		sec11: { low1: { date: 10, id: 20, code: 30 } },
		sec12: { low2: { date: 10, id: 20, code: 30 } },
	},
	// bld 5 совпадает - отсальное нет
	bld5: {
		sec1: { low11: { date: 10, id: 20, code: 30 } },
		sec2: { low21: { date: 10, id: 20, code: 30 } },
		sec3: { low31: { date: 10, id: 20, code: 30 } },
	},
	// bld6, sec1 совпадает, остальное нет
	bld6: {
		sec11: { low11: { date: 16, id: 26, code: 36 } },
		sec12: { low2: { date: 10, id: 20, code: 30 } },
		// sec12: { low3: { date: 10, id: 20, code: 30 } },
	},
	// bld7, sec1, low1 совпадает
	bld7: {
		sec11: {
			low1: { date: 1, id: 2, code: 3 },
			low21: { date: 15, id: 250, code: 350 },
		},
		// sec12: { low2: { date: 10, id: 20, code: 30 } },
		// sec12: { low3: { date: 10, id: 20, code: 30 } },
	},
}
