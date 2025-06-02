import { FC } from 'react'
import axios from 'axios'

const Login: FC = () => {
	return (
		<>
			<form method='post' onSubmit={fnLogin}>
				<input placeholder='Логин' type='text' name='login' />
				<input placeholder='Пароль' type='text' name='password' />
				<button type='submit'>Войти</button>
			</form>
			<button onClick={fnClient}>Клиенты</button>
		</>
	)

	async function fnLogin(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault()
			const form = {
				login: e.currentTarget.login.value,
				password: e.currentTarget.password.value,
				accessToken: '',
			}
			const config = {
				method: 'POST',
				url: 'http://192.168.21.41:3200/api/auth/login',
				headers: {
					// Добавляем необходимые заголовки
					'Content-type': 'application/json; charset=UTF-8',
				},
				data: form,
			}

			const response = await axios.request(config)

			localStorage.setItem('access', response.data.accessToken)
			console.log(111, response.data)
		} catch (error) {
			throw error
		}
	}
	async function fnClient() {
		try {
			const access = localStorage.getItem('access')
			console.log(222, access)
			const config = {
				method: 'GET',
				url: 'http://192.168.21.41:3200/api/employee',
				headers: {
					// Добавляем необходимые заголовки
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: `Bearer ${access}`
				},
			}

			const response = await axios.request(config)
			console.log(333, response.data)
		} catch (error) {
			throw error
		}
	}
}

export default Login
