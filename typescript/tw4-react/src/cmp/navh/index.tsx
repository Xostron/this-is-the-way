import { NavLink } from 'react-router'
import './style.css'

function Navh() {
	return (
		<article className='cmp-navh'>
			{link.map((el, i) => (
				<NavLink
					key={el.path}
					className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}
					to={el.path}
				>
					{el.name}
				</NavLink>
			))}
		</article>
	)
}

export default Navh

const link = [
	{
		path: '/login',
		name: 'Войти',
	},
	// Список PC
	{
		path: '/',
		name: 'PC',
	},
]
