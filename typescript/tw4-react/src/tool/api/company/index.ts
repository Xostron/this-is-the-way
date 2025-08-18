import axios from 'axios'
import { redirect } from 'react-router'
import { IFetchCmp, ICmp, IListPc, IPc, IBld } from './type'
import delay from '@util/delay'

async function fetchCompanies() {
	try {
		const accessToken = localStorage.getItem('accessToken')
		if (!accessToken) throw Error('Пользователь не авторизован')
		const config = {
			method: 'GET',
			url: `${process.env.PUBLIC_URI_SERVER}/employee`,
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${accessToken}`,
			},
		}
		// await delay(5000)
		const response = await axios.request<IFetchCmp>(config)
		return response.data.result
	} catch (error: any) {
		console.log(1110, error)
		if (error.response.status == 401) throw Error('Пользователь не авторизован')
		throw error
	}
}

export default fetchCompanies
