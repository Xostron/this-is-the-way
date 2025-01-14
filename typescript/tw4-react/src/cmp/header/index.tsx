import { FC } from 'react'
import { PrdSel, PrdSelHelp } from '@tool/product'

interface Props {
	selections: PrdSel[]
}

const Header:FC<Props> = (props)=>{
	const count = PrdSelHelp.productCount(props.selections)
	const total = PrdSelHelp.total(props.selections)
	return <header>
		{count ===0 ? "(Не выбрано)":`${count} шт., ` + `$${total.toFixed(2)}`}
		<button>
			Подтвердить заказ
		</button>
	</header>
}

export default Header