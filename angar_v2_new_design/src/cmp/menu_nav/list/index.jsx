import { NavLink } from 'react-router-dom'

export default function List({ list }) {
	if (!list) return <></>
	const cls = 'cmp-menunav-navlink'
	return (
		<section className='cmp-menunav-section'>
			{list.map((el, i) => {
				const fnClassname = (n) => {
					const { isActive } = n
					console.log(111, n)
					return isActive ? cls + ` cmp-menunav-active` : cls
				}
				return (
					<NavLink key={el.id} className={fnClassname} to={el.path}>
						{el.icon && <img src={el.icon} />}
						{/* {el.title && <span>{el.title}</span>} */}
					</NavLink>
				)
			})}
		</section>
	)
}
