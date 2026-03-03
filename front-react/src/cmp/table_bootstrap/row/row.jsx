import defCells from '../def'
import cfgCells from '../config'
import Cell from '../def/cell'

/**
 * Строка
 * @param {object} row Мясо строки
 * @param {number} orderRow Номер строки
 */
function Row({ row, orderRow }) {
	// console.log(44, cells)
	return (
		<tr>
			{/* Рама строки, перебор рамы ячеек el*/}
			{cfgCells.map((el) => {
				// Фабричный компонент ячейки
				const FCell = defCells?.[el.type] ?? <Cell key={el.id} obj={{ value: 'Неопределен тип ячейки' }} />
				// Мясо ячейки
				const obj = el.type == 'payment' ? row.payment.find((t) => t.order === el.monthId) : row
				console.log(el, row, el.getValue(obj, el, orderRow))
				return <FCell key={el.id} obj={el.getValue(obj, el, orderRow)} />
			})}
		</tr>
	)
}

export default Row
