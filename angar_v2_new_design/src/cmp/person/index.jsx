import Btn from '@cmp/fields/btn'
import useAuthStore from '@store/auth'
import useWarn from '@store/warn'
import out from './fn'
import './style.css'

//Войти или Информация о пользователе
export default function Person({ style, cls }) {
	const { isAuth, name } = useAuthStore(({ isAuth, name }) => ({ isAuth, name }))
	const warn = useWarn(({ warn }) => warn)

	// const title = isAuth ? name : 'Войти'
	let title = isAuth ? name[0] : null
	if (name==='Сервис') title = 'R'
	let cl = ['cmp-person', cls]
	cl = cl.join(' ')
	const icon = !isAuth ? '/img/person.svg' : null

	return (
		<div className='cmp-person-wrapper person' onClick={onClick}>
			<div className='cmp-person'>
				{icon && <img src={icon} />}
				{title && <span className='cmp-person-authname'>{title}</span>}
			</div>
		</div>
	)
	function onClick() {
		if (!isAuth) {
			warn(null, 'person')
			return
		}
		warn('logout', 'warn', out)
	}
}
