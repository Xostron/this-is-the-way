import Message from '@src/cmp/sub_header/message'
import Person from '@cmp/person'
import Prod from '@src/cmp/sub_header/prod'
import Turn from '@cmp/turn'
import './style.css'

//Позаголовок в странице склада
export default function SubHeader({}) {
	return (
		<>
			{/* <Turn style={{ gridArea: '1 / 1 / 1 / 1' }} /> */}
			<section className='cmp-subheader-wrapper'>
				<Prod />
				<Message />
			</section>
			{/* <Person style={{ gridArea: '1 / 3 / 1 / 3', justifySelf:'end' }} /> */}
		</>
	)
}
