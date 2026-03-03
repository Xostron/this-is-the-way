import Row from './row'

// Рендер строк
function Rows({ rows = [] }) {
	return (
		<>
			{rows.map((el, i) => {
				return <Row key={i} row={el} orderRow={i} />
			})}
		</>
	)
}

export default Rows
