import { Link } from 'react-router-dom'
import useInputStore from '@store/input'
import Other from './fn/other'
import Tprd from './fn/tprd'
import './style.css'

export default function Item({ sec = {}, bId, iSect, cls }) {
	const { _id, name, valve, heating, fan } = sec
	// Показания и настройки
	const input = useInputStore((s) => s.input)
	const retain = input?.retain?.[bId]
	// ссылка на секцию
	const path = 'section/' + _id
	// Режим работы секции
	const mode =
		retain?.mode?.[_id] === true
			? 'Автомат.'
			: retain?.mode?.[_id] === false
			? 'Ручной'
			: 'Выключена'
	// Клапаны, вентилятор и обогреватель
	const other = { valve, heating, fan }

	let cl = ['section', 'sx' + cls]
	cl = cl.join(' ')

	return (
		<Link className={cl} to={path}>
			<div className={`section-name`}>
				{name}
				<span className={`section-mode`}>{mode}</span>
			</div>
			<Tprd sId={_id} />
			<Other buildId={bId} data={other} sect={iSect} cls={'vfx' + cls} />
		</Link>
	)
}
