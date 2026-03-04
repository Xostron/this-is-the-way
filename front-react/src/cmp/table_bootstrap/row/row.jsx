import defCells from '../def'
import cfgCells from '../config'
const DefaultCell = defCells.order

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
				const FCell = defCells?.[el.type] ?? DefaultCell
				// Мясо ячейки
				const obj = el.type == 'payment' ? row?.payment?.[el.monthId] : row
				if (el.type == 'calcSum') console.log(1, el, obj)
				return <FCell key={el.id} obj={el.getValue(obj, el, orderRow)} />
			})}
		</tr>
	)
}

export default Row
