import axios from 'axios'

interface IResLogin {
	accessToken?: string
}
async function fetchLogin(data: object) {
	// console.log(111, process.env.PUBLIC_URI_SERVER)
	try {
		const config = {
			method: 'POST',
			url: `${process.env.PUBLIC_URI_SERVER}/auth/login`,
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			data,
		}
		const response = await axios.request<IResLogin>(config)

		if (response.data.accessToken)
			localStorage.setItem('accessToken', response.data.accessToken)
		else throw new Error('Не удалось получить токен')

		return response.data
	} catch (error) {
		console.log('\\tool\\api\\index.ts', error)
		throw error
	}
}

export default fetchLogin