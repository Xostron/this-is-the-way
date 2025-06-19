import { FC, useEffect, useState } from 'react'
import { fetchCompanies } from '@src/tool/api'
import { ICmp } from '@src/tool/api'
import Item from '@src/cmp/item/company'
import './style.css'

const Main: FC = () => {
	const [list, setList] = useState<ICmp[]>()
	useEffect(() => {
		const data = async () => {
			const r = await fetchCompanies()
			if (r) setList(r)
		}
		data()
	}, [])
	console.log(111, list)
	return (
		<section className='page-main'>
			<h1>Список клиентов</h1>
			<div className='page-main-list'>{!!list && list.map((el) => <Item key={el._id} data={el} />)}</div>
		</section>
	)
}

export default Main
