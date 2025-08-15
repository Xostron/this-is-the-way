import Btn from '@src/cmp/fields/btn'
import axios from 'axios'
import { useEffect, useState, type MouseEventHandler } from 'react'
interface ICookie {
	name: string
	value: string
	days: number
}
interface IFetchCookie {
	result: string
}

export default function Cookie() {
	const [value, setValue] = useState<string | boolean | null>(null)

	useEffect(() => {
		// Создать куки
		setCookie({ name: 'web', value: 'xostron', days: 1 })
	}, [])
	// Куки присланные от сервера  {server=Exodus2} сохраняются в куки storage, но они не читаются js,
	// т.к. на сервере куки сгенерированы с ключом httpOnly
	console.log('document.cookie@', document.cookie)

	return (
		<main style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
			<Btn label='Получить cookie' onClick={onClick} gradient nav />
			{value ? <span>Запрос ОК</span> : <></>}
		</main>
	)

	// Function declaration с явным указанием типа
	async function onClick(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
		const config = {
			method: 'GET',
			url: `${process.env.PUBLIC_BACK_N1_SERVER}/cookie`,
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			withCredentials: true, //Разрешить куки чтение и запись
		}
		try {
			let response = await axios.request<IFetchCookie>(config)
			const r = response.data.result
			setValue(r)
			console.log('Кнопка нажата', response, document.cookie)
		} catch (error) {
			console.error(error)
			setValue(false)
		}
	}
}

function setCookie({ name, value, days }: ICookie): void {
	const expires = new Date()
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
	document.cookie = `${name}=${value};expires=${expires.toUTCString()}`
}
