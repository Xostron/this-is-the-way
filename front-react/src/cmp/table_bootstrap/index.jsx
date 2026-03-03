import Table from 'react-bootstrap/Table'
import Rows from './row/rows'
import Cell from './def/cell'
import configCells from './config'

function TableBoot({ data }) {
	return (
		<Table responsive>
			<thead className='bg-dark'>
				<tr>
					{configCells.map((el) => (
						<Cell key={el.id} obj={el} />
					))}
				</tr>
			</thead>
			<tbody className=''>
				<Rows rows={data} />
			</tbody>
		</Table>
	)
}

export default TableBoot
