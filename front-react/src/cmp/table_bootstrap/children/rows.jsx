import Row from './row'

function Rows({ rows = [] }) {
	console.log(rows)
	return (
		<>
			{rows.map((el, i) => (
				<Row key={i} cells={el.parent} />
			))}
		</>
	)
}

export default Rows
