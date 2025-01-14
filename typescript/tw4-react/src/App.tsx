import { FC, useState } from 'react'
import './App.css'
import PrdList from '@cmp/prd_list'
import { Prd, PrdSel, PrdSelMut } from './tool/product'

const data: Prd[] = [1, 2, 3, 4, 5].map((el) => ({
	id: el,
	name: `Орден${el}`,
	category: `Legion${el}`,
	desc: `Часть ${el}`,
	price: el * 100,
}))

const App: FC = () => {
	const [sels, setSels] = useState(Array<PrdSel>())
	const ctg = [...new Set(data.map((el) => el.category))]
	const add = (prd: Prd, count: number) => {
		setSels((prev) => {
			PrdSelMut.addPrd(prev, prd, count)
			return [...prev]
		})
	}
	return (
		<div className='content'>
			<PrdList prd={data} ctg={ctg} selections={sels} add={add} />
		</div>
	)
}

export default App
