import useValue from './hook'
import './style.css'

export default function Item({
	type = 'tout',
	subkey = 'min',
	stl = {},
	label = '',
	highlight = false,
}) {
	const { value, unit, cls } = useValue(type, subkey)
	// Стиль метки: по-умолчанию блеклый, highlight - контрастный
	let clLabel = ['cmp-outdoor-value-label']
	if (highlight) clLabel.push('highlight')
	clLabel = clLabel.join(' ')
	return (
		<article style={stl} className={cls}>
			{value} {unit}
			<span className={clLabel}>{label}</span>
		</article>
	)
}
