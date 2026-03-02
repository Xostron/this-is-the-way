import Row from './row'

function Rows({ rows = [] }) {
	console.log(rows)
	return (
		<>
			{rows.map((el, i) => (
				<tr>
					{i === 0 && typeof el.order == 'number' ? <td>{el.order}</td> : <></>}
					<Row cells={el.parent} />
				</tr>
			))}
		</>
	)
}

export default Rows
