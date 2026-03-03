import def from '@dict/t_table'

function Cell({ obj = {} }) {
	if (!obj || !Object.keys(obj)?.length) return <td></td>
	return (
		<td className='d-flex flex-column'>
			{Object.entries(obj).map(([name, val]) => (
				<span>
					{def?.[name]} {val}
				</span>
			))}
		</td>
	)
}

export default Cell
