import axios from 'axios'
import { IFetchCmp, ICmp, IListPc, IPc, IBld } from './type'

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
		const response = await axios.request<IFetchCmp>(config)
		return response.data.result
	} catch (error) {
		console.log(1110, error)
		throw error
	}
}

export default fetchCompanies
