import Table from 'react-bootstrap/Table'
import Cell from '../children/cell'
import exampleData from './example_data'

function Example() {
	return (
		<Table responsive>
			<thead className='bg-dark'>
				<tr>
					{exampleData.thead.map((el) => (
						<Cell data={el} />
					))}
				</tr>
			</thead>
			<tbody className=''>
				<tr>
					{exampleData.tbody.map((el) => (
						<Cell data={el} />
					))}
				</tr>
			</tbody>
		</Table>
	)
}

export default Example
