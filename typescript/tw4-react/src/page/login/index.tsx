import { FC } from 'react'
import fetchLogin from '@src/tool/api/login'
import { useNavigate } from 'react-router'

const Login: FC = () => {
	const navigate = useNavigate()
	return (
		<form method='post' onSubmit={fnLogin}>
			<input placeholder='Логин' type='text' name='login' />
			<input placeholder='Пароль' type='text' name='password' />
			<button type='submit'>Войти</button>
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
			if (r) navigate('/')
		} catch (error) {
			console.log('\\page\\login\\index.tsx', error)
		}
	}
}

export default Login
