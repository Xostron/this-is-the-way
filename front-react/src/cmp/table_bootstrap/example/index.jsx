import Table from 'react-bootstrap/Table'
import Row from '../children/row'
import Rows from '../children/rows'
import configCells from '../config'
import exampleData from './example_data'
import Cell from '../def/cell'

function Example() {
	return (
		<Table responsive>
			<thead className='bg-dark'>
				<tr>
					{configCells.map((el, i) => (
						<Cell key={i} obj={el} />
					))}
				</tr>
			</thead>
			<tbody className=''>
				<Rows rows={exampleData} />
			</tbody>
		</Table>
	)
}

export default Example
