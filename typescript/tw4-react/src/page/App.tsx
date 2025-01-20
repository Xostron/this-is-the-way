import { FC, useState } from 'react'
import { Prd, PrdSel, PrdSelMut } from '@src/tool/entries'
import PrdList from '@cmp/prd_list'
import { useAppDispatch, useAppSelector, reducers } from '@src/store'
import '@src/style.css'

const data: Prd[] = [1, 2, 3, 4, 5].map((el) => ({
	id: el,
	name: `Орден${el}`,
	category: `Legion${el}`,
	desc: `Часть ${el}`,
	price: el * 100,
}))

const App: FC = () => {
	const selections = useAppSelector((state) => {
		console.log(222)
		return state.selections
	})
	console.log(1111,selections)
	const dispatch = useAppDispatch()

	// const [sels, setSels] = useState(Array<PrdSel>())

	const ctg = [...new Set(data.map((el) => el.category))]

	return (
		<div className='content'>
			<PrdList prd={data} ctg={ctg} selections={selections} add={add} />
		</div>
	)

	function add(p: Prd, q: number) {
		dispatch(reducers.add([p, q]))
	}

	// function add(prd: Prd, count: number) {
	// 	setSels((prev) => {
	// 		PrdSelMut.addPrd(prev, prd, count)
	// 		console.log(111, prev, prd, count)
	// 		return [...prev]
	// 	})
	// }
}

export default App
