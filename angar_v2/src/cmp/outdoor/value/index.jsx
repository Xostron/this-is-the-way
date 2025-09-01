import useValue from './hook'
import './style.css'

export default function Item({ type = 'tout', subkey = 'min', stl = {}, label = '' }) {
	const { value, unit, cls } = useValue(type, subkey)

	return (
		<article style={stl} className={cls}>
			{value} {unit}
			<span className='cmp-outdoor-value-label'>{label}</span>
		</article>
	)
}
