import { FC } from 'react'
import fetchLogin from '@src/tool/api/login'
import { useNavigate } from 'react-router'
import './style.css'
import Navh from '@src/cmp/navh'

const Login: FC = () => {
	const navigate = useNavigate()
	return (
		<>
			<Navh />
			<form className='page-login' method='post' onSubmit={fnLogin}>
				<img className='page-login-logo' src='img/logo.svg' />
				<input className='page-login-input' placeholder='Логин' type='text' name='login' />
				<input className='page-login-input' placeholder='Пароль' type='text' name='password' />
				<button className='page-login-submit' type='submit'>
					Войти
				</button>
			</form>
		</>
	)

	async function fnLogin(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault()
			const form = {
				login: e.currentTarget.login.value,
				password: e.currentTarget.password.value,
			}
			// const r = await fetchLogin(form)
			const r = true
			if (r) navigate('/',{ replace: true })
		} catch (error) {
			console.log('\\page\\login\\index.tsx', error)
		}
	}
}

export default Login
