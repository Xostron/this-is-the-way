import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

const data = [
	{ id: '1', name: 'Болтер' },
	{ id: '2', name: 'Силовая перчатка' },
	{ id: '3', name: 'Цепной меч' },
]

const PTable = () => {
	// Храним ID выбранной строки
	const [selectedId, setSelectedId] = useState('1')
	return (
		<main className='page'>
			<section className='header'>Таблица</section>
			<section className='content p-3'>
				Table
				{/* <Button>Example</Button> */}
				<Table striped bordered hover variant='dark'>
					<thead>
						<tr>
							<th>#</th>
							<th>Орден</th>
							<th>Примарх</th>
							<th className='text-center'>
								{/* Чекбокс в заголовке для "Выбрать всё" */}
								<Form.Check type='checkbox' aria-label='select all' />
							</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Иван</td>
							<td>Иванов</td>
							<td className='text-center'>
								{/* Обычный чекбокс в ячейке */}
								<Form.Check
									type='checkbox'
									id='check-1' // id должен быть уникальным
									aria-label='option 1'
								/>
							</td>
							{/* className='d-flex flex-column align-items-center justify-content-center' */}
							<td className='d-flex flex-column align-items-center'>
								<div>
									{data.map((el) => (
										<Form.Check
											type='radio'
											name='group1' // Одинаковое имя для всех кнопок в группе
											id={`radio-${el.id}`}
											checked={selectedId === el.id}
											onChange={() => setSelectedId(el.id)}
											label={el.name}
											className='mb-0'
										/>
									))}
								</div>
							</td>
						</tr>
					</tbody>
				</Table>
			</section>
			<section className='asidel'>3</section>
			<section className='asider'>4</section>
			<section className='footer'>5</section>
		</main>
	)
}

export default PTable
