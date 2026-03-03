import defCells from '../def'
import cfgCells from '../config'
import Col from '../def/cell'

/**
 * Строка
 * @param {object[]} row Данные на отображение
 */
function Row({ row, idx }) {
	// console.log(44, cells)
	return (
		<tr>
			{cfgCells.map((el, i) => {
				const Cell = defCells?.[el.type] ?? (
					<Col key={el.id} obj={'Неопределен тип ячейки'} />
				)
				const obj = el.type == 'payment' ? row.other[el.monthId] : row
				console.log(idx, el, row, el.getValue(row, idx, el.type))
				return <Cell key={el.id} obj={el.getValue(obj, idx, el.type)} />
			})}
		</tr>
	)
}

export default Row
