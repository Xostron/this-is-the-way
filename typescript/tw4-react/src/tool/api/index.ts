import axios from 'axios'
import { redirect } from 'react-router-dom'
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

		if (response.data.accessToken) localStorage.setItem('accessToken', response.data.accessToken)
		else throw new Error('Не удалось получить токен')

		return response.data
	} catch (error) {
		console.log('\\tool\\api\\index.ts', error)
		throw error
	}
}

interface IBld {
	code:string
	on:boolean
	sectionCount:1
	_id:string
}
interface IPc {
	addr: string
	ip: string
	state: string | null
	_id: string
}
// Pos терминал
interface IListPc {
	order: number
	data: IBld
	header: IPc
}
// Компания
interface ICmp {
	_id: string
	name: string
	code: string
	pc: IListPc[]
}
interface IFetchCmp {
	result:ICmp[]
}
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

export { fetchCompanies, fetchLogin }
export type { IFetchCmp, ICmp }
