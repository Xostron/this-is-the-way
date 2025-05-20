import './style.css'
import Input from '@cmp/fields/input'

const List = ({ data }) => {
	console.log(111, data)
	return (
		<article className='list'>
			{data.map((el, i) => (
				<div key={i}>
					<span>{el.code}</span>
					<Row data={el} />
				</div>
			))}
		</article>
	)
}

const Row = ({ data }) => {
	return (
		<div className='row'>
			{data.list.map((el, i) => (
				<Cell key={i} code={data.code} data={el} />
			))}
		</div>
	)
}

const values = {
	a: { t: 1, k: 2 },
	b: { t: 3, k: 4 },
	c: { t: 5, k: 6 },
	d: { t: 7, k: 8 },
	e: { t: 9, k: 10 },
}

const Cell = ({ code, data }) => {
	const value = values[code][data.code]
	return (
		<div className='cell'>
			<Input value={value} />
		</div>
	)
}

export default List
