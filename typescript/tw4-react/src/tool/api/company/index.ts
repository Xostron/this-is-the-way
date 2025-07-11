import axios from 'axios'
import { redirect } from 'react-router-dom'
import { IFetchCmp, ICmp, IListPc, IPc, IBld } from './type'


async function fetchCompanies() {
	const accessToken = localStorage.getItem('accessToken')
	// console.log(222, accessToken)
	if (!accessToken) redirect('/login')
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
}

export default fetchCompanies
