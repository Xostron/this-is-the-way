import { NavLink } from 'react-router'
import './style.css'
import { JSX } from 'react'

function Navh(): JSX.Element {
	return (
		<article className='cmp-navh'>
			{link.map((el, i) => {
				let className = 'navlink'
				if (el.border) className += ' navlink_border'
				const fnClassname = ({ isActive }: { isActive: boolean }) =>
					isActive ? `${className} active` : className
				return (
					<NavLink key={el.path} className={fnClassname} to={el.path}>
						{el.name}
					</NavLink>
				)
			})}
		</article>
	)
}

export default Navh

const link = [
	{
		path: '/login',
		name: 'Войти',
		border: true,
	},
	// Список PC
	{
		path: '/main',
		name: 'PC',
	},
	{ path: '/pg1', name: 'DOM' },
	{ path: '/pg2', name: 'BtnClick' },
	{ path: '/pg3', name: 'GEO' },
	{ path: '/pg4', name: 'OOP' },
	{ path: '/pg5', name: 'Cookie' },
]
