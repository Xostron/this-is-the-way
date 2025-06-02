import { FC, useEffect } from 'react'
import axios from 'axios'

const Main: FC = () => {
	// useEffect(() => {})
	return <div>СПИСОК PC</div>
}

export const rootLoader = async () => {
	const access = localStorage.getItem('access')
	console.log(222, access)
	const config = {
		method: 'GET',
		url: 'http://192.168.21.41:3200/api/employee',
		headers: {
			// Добавляем необходимые заголовки
			'Content-type': 'application/json; charset=UTF-8',
			Authorization: `Bearer ${access}`,
		},
	}
	const response = await axios.request(config)
	console.log(response)
	return response.data
}
export default Main
