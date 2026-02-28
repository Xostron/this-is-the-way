import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Example from './example'

function TableBootstrap({ data = {} }) {
	if (!data || !Object.keys(data)?.length) return <Example />
	return (
		<Table striped bordered hover variant='dark'>
			<thead>
				<tr>
					<th scope='col'>#</th>
					<th scope='col'>Имя</th>
					<th scope='col'>Январь</th>
					<th scope='col' className='text-center'>
						Февраль
					</th>
					<th>Март</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td className='text-center'></td>
					<td className='d-flex flex-column align-items-center'></td>
				</tr>
			</tbody>
		</Table>
	)
}

export default TableBootstrap


