import Input from '@cmp/fields/input'
import Btn from '@cmp/fields/btn'
import { useState } from 'react'

export default function Login() {
	const [login, setLogin] = useState(null)
	const [psw, setPsw] = useState(null)
	return (
		<main className='page'>
			<section className='content'>
				<form onSubmit={fnLogin}>
					<Input value={login} setValue={setLogin} placeholder='Логин/email/телефон' />
					<Input value={psw} setValue={setPsw} placeholder='Пароль' />
					<Btn label='Отправить' type='submit' />
				</form>
			</section>
		</main>
	)
	function fnLogin(e) {
		e.preventDefault()
		const options = {
			method: 'POST', // Здесь так же могут быть GET, PUT, DELETE
			// Тело запроса в JSON-формате
			body: JSON.stringify({ login, password: psw }),
			// Или same-origin, если можно делать такие запросы
			// только в пределах этого домена (для включения в запрос cookies)
			credentials: 'include',
			headers: {
				// Добавляем необходимые заголовки
				'Content-type': 'application/json; charset=UTF-8',
			},
		}
		console.log('1111', login, psw)
		fetch('http://localhost:4101/api/auth/signin', options)
			.then((res) => {
				if (!res.ok) {
					throw new Error('Error occurred!')
				}
				return res.json()
			})
			.then((r) => {
				console.log(222, r)
				localStorage.setItem('access', r.accessToken)
			})
			.catch(console.log)
	}
}
