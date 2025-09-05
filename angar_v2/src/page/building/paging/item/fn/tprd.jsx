import useInputStore from '@store/input'
import defUn from '@src/tool/unit'

/**
 * Мин, макс температура продукта по секции
 * @param {string} sId ID секции
 * @returns
 */
export default function Tprd({ sId }) {
	const d = [
		{ label: 'min', subkey: 'min', type: 'tprd', sId },
		{ label: 'max', subkey: 'max', type: 'tprd', sId },
	]

	return (
		<div className='section-sens'>
			{!!d?.length && d.map((el, i) => <Item key={i} data={el} />)}
		</div>
	)
}

function Item({ data = {} }) {
	const { label, type, subkey, sId } = data
	const { state, value } = useInputStore((s) => s.getTotalBy(type, subkey, sId))
	const unit = defUn?.[type]
	let cls = ['sensor-item']
	// ошибка датчика
	if (state === 'alarm') cls.push('error')
	if (state === 'off') cls.push('off')
	cls = cls.join(' ')
	return (
		<div className={cls}>
			{label} {value ?? '--'} {unit}
		</div>
	)
}
