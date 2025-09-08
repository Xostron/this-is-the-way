import { useShallow } from 'zustand/react/shallow'
import { useParams } from 'react-router-dom'
import useAuthStore from '@store/auth'
import useInputStore from '@store/input'
import useWarn from '@store/warn'
import Btn from '@cmp/fields/btn'

//Включить/Выключить
export default function Turn({ style, cls }) {
	const { build } = useParams()
	const warn = useWarn((s) => s.warn)
	const isAuth = useAuthStore((s) => s.isAuth)
	const start = useInputStore(useShallow((s) => s.input?.retain?.[build]?.start))

	const icon = isAuth ? '/img/turn.svg' : '/img/turn_b.svg'
	const st = isAuth ? style : { ...style, color: 'var(--primary)' }
	let cl = ['control', cls]
	cl = cl.join(' ')

	return (
		<div className='cmp-person-wrapper turnon' onClick={onClick}>
			<div className='cmp-person'>
				{icon && <img src={icon} />}
				<span>{start ? 'Вкл.' : 'Выкл.'}</span>
			</div>
		</div>
		// <>
		// 	<Btn
		// 		cls={cl}
		// 		style={st}
		// 		icon={img}
		// 		title={start ? 'Вкл.' : 'Выкл.'}
		// 		onClick={onClick}
		// 	/>
		// </>
	)
	function onClick() {
		// Если не авторизован -> предупреждение
		if (!isAuth) {
			warn('auth', 'warn', () => warn(null, 'person'))
			return
		}
		// Авторизован -> окно управления складом
		warn({ build }, 'turn')
	}
}
