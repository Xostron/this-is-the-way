import { FC } from 'react'
import { useLoaderData } from 'react-router'
import ListCompany from '@src/cmp/list/company'
import Navh from '@src/cmp/navh'
import delay from '@util/delay'
import './style.css'


const Main: FC = () => {
	const r = useLoaderData()
	console.log(222, r)
	// delay(5000)
	return (
		<main className='page-main'>
			<section className='page-main-header'>
				header
				<Navh />
			</section>
			<section className='page-main-content'>
				<h1>Список клиентов</h1>
				<ListCompany list={r} />
			</section>
			<section className='page-main-asidel'>asidel</section>
			<section className='page-main-asider'>asider</section>
			<section className='page-main-footer'>footer</section>
		</main>
	)
}

export default Main
