import { FC } from 'react'
import { Outlet } from 'react-router'
import Navh from '@src/cmp/navh'
import './style.css'
import Loader from '@src/cmp/loader'

const Main: FC = () => {
	return (
		<main className='page-main'>
			<section className='page-main-header'>
				header
				<Navh />
			</section>
			<section className='page-main-content'>
				<Outlet />
			</section>
			<section className='page-main-asidel'>asidel</section>
			<section className='page-main-asider'>asider</section>
			<section className='page-main-footer'>footer</section>
		</main>
	)
}

export default Main
