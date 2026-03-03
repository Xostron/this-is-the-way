import Cell from './cell'
import InfoCell from './info_cell'
import PayCell from './pay_cell'

// Компонент ячейки
const cell = {
	order: Cell, // Обычная
	payment: PayCell, // Ячейка выплат
	info: InfoCell, // Ячейка о бумаге
}

export default cell
