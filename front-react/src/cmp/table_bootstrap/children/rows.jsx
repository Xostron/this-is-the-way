import Row from './row'

function Rows({ rows = [] }) {
	return (
		<>
			{rows.map((el, i) => {
				return <Row key={i} row={el} idx={i} />
			})}
		</>
	)
}

export default Rows
