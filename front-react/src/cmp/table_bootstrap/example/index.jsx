import Table from 'react-bootstrap/Table'
import Row from '../children/row'
import exampleData from './example_data'
import Rows from '../children/rows'

function Example() {
	return (
		<Table responsive>
			<thead className='bg-dark'>
				<Rows rows={exampleData.thead} />
			</thead>
			<tbody className=''>
				<Rows rows={exampleData.tbody} />
			</tbody>
		</Table>
	)
}

export default Example
