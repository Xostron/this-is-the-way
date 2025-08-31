import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import SubHeader from '@cmp/sub_header'
import Outdoor from '@cmp/outdoor'
import Banner from '@cmp/banner'

//Секции склада / Секция
export default function BuildOrSect({}) {
	let { sect } = useParams()
	const type = sect ? 'section' : 'building'

	return (
		<main className='build'>
			<SubHeader />
			<section className='build-backdrop'>
				<Outdoor />
				<Outlet />
			</section>
			<Banner type={type} />
		</main>
	)
}
