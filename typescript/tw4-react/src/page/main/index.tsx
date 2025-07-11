import { FC, useEffect, useState } from 'react'
import fetchCompanies from '@api/company'
import { ICmp } from '@api/company/type'
import ListCompany from '@src/cmp/list/company'
import Navh from '@src/cmp/navh'
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
		<main className='page-main'>
			<section className='page-main-header'>
				header
				<Navh />
			</section>
			<section className='page-main-content'>
				<h1>Список клиентов</h1>
				<ListCompany list={list} />
			</section>
			<section className='page-main-asidel'>asidel</section>
			<section className='page-main-asider'>asider</section>
			<section className='page-main-footer'>footer</section>
		</main>
	)
}

export default Main
