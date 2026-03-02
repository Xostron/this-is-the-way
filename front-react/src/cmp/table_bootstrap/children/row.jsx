import Cell from './cell'

function Row({ cells = [] }) {
	return (
		<>
			{cells.map((el) => (
				<Cell o={el} />
			))}
		</>
	)
}

export default Row
