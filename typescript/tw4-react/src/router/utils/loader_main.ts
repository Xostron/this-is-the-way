import { type LoaderFunctionArgs } from 'react-router'
import fetchCompanies from '@api/company'

// Функция-лоадер может принимать аргументы следующего типа:
// type LoaderFunctionArgs<Context> = {
// 	context?: Context | undefined
// 	params?: Params<string>
// 	request?: Request
// }

export default function loaderMain({ context, params, request }: LoaderFunctionArgs) {
	const list = fetchCompanies()
	return { list }
}
