import { NavLink } from 'react-router'
import { TLink } from '../index'
import { JSX } from 'react'

export default function List({ list }: { list: TLink[] }): JSX.Element {
	if (!list) return <></>
	return (
		<section className=''>
			{list.map((el, i) => {
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
		</section>
	)
}
