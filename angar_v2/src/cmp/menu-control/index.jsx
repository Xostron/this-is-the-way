import Turn from '@cmp/turn'
import Person from '@cmp/person'
import './style.css'

export default function MenuControl() {
	return (
		<section className='cmp-menucontrol-wrapper'>
			<Person />
			<Turn />
		</section>
	)
}
