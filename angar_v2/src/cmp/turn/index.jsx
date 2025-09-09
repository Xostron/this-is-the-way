import { useShallow } from 'zustand/react/shallow'
import { useParams } from 'react-router-dom'
import useAuthStore from '@store/auth'
import useInputStore from '@store/input'
import useWarn from '@store/warn'

//Включить/Выключить
export default function Turn({ style, cls }) {
	const { build } = useParams()
	const warn = useWarn((s) => s.warn)
	const isAuth = useAuthStore((s) => s.isAuth)
	const start = useInputStore(useShallow((s) => s.input?.retain?.[build]?.start))

	const icon = start ? '/img/turn.svg' : '/img/turn_b.svg'

	
	return (
		<div className='cmp-person-wrapper turnon' onClick={onClick}>
			<div className='cmp-person'>
				{icon && <img src={icon} />}
				{/* <span>{start ? 'Вкл.' : 'Выкл.'}</span> */}
			</div>
		</div>

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
