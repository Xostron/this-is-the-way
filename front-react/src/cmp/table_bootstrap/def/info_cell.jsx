import def from '@dict/t_table'
import { Button } from 'react-bootstrap'

function Cell({ obj = {}, show, onShow }) {
	if (!obj || !Object.keys(obj)?.length) return <td></td>
	// const Icon =
	return (
		<td className='d-flex flex-row'>
			<div className='d-flex flex-column'>
				{Object.entries(obj).map(([name, val]) => (
					<span>
						{def?.[name]} {val}
					</span>
				))}
			</div>
			{onShow && (
				<button type='button' className='btn btn-secondary' onClick={onShow}>
					{show ? <i class='bi bi-chevron-up'></i> : <i class='bi bi-chevron-down'></i>}
				</button>
			)}
		</td>
	)
}

export default Cell
