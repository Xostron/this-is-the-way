import Cell from './cell'

function Row({ cells = [] }) {
	return (
		<tr>
			{cells.map((el) => (
				<Cell obj={el} />
			))}
		</tr>
	)
}

export default Row
