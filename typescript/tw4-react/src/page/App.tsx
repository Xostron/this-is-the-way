import { FC, useState } from 'react'
import { Prd, PrdSel, PrdSelMut } from '@src/tool/entries'
import PrdList from '@cmp/prd_list'
import { useStoreDispatch, useStore, reducers } from '@src/store'
import '@src/style.css'

console.log(Array(5).fill(0))

const data: Prd[] = Array(5)
	.fill(0)
	.map((el, i) => ({
		id: el,
		name: `Орден${i}`,
		category: `Legion${i}`,
		desc: `Часть ${i}`,
		price: i * 100,
	}))

const Main: FC = () => {
	return(<></>)
}

const App: FC = () => {
	const [selections] = useStore((state) => [state.selections])

	console.log(1111, selections)
	const dispatch = useStoreDispatch()

	const ctg = [...new Set(data.map((el) => el.category))]

	return (
		<div className='content'>
			<PrdList prd={data} ctg={ctg} selections={selections} add={add} />
		</div>
	)

	function add(p: Prd, q: number) {
		dispatch(reducers.add([p, q]))
	}
}

export default App
