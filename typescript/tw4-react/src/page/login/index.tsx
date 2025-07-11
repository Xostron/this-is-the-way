import { FC } from 'react'
import fetchLogin from '@src/tool/api/login'
import { useNavigate } from 'react-router'
import './style.css'

const Login: FC = () => {
	const navigate = useNavigate()
	return (
		<form className='page-login' method='post' onSubmit={fnLogin}>
			<img className='page-login-logo' src='img/logo.svg' />
			<input className='page-login-input' placeholder='Логин' type='text' name='login' />
			<input className='page-login-input' placeholder='Пароль' type='text' name='password' />
			<button className='page-login-submit' type='submit'>
				Войти
			</button>
			{/* <Navigate to={'/'}/> */}
		</form>
	)

	async function fnLogin(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault()
			const form = {
				login: e.currentTarget.login.value,
				password: e.currentTarget.password.value,
			}
			const r = await fetchLogin(form)
			if (r)  navigate('/')
		} catch (error) {
			console.log('\\page\\login\\index.tsx', error)
		}
	}
}

export default Login
