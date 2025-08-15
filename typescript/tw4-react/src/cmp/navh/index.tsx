import { JSX } from 'react'
import List from './list'
import './style.css'

export default function Navh(): JSX.Element {
	return (
		<article className='cmp-navh-content'>
			{/* Основные ссылки */}
			<List list={link} />
			{/* Вспомагательные ссылки */}
			<List list={linkAux} />
		</article>
	)
}

export type TLink = {
	name: string
	path: string
	border?: boolean
}
// Основные ссылки
const link: TLink[] = [
	// Список PC
	{
		path: '/main',
		name: 'PC',
	},
	{ path: '/pg1', name: 'DOM' },
	{ path: '/pg2', name: 'BtnClick' },
	{ path: '/pg3', name: 'GEO' },
	{ path: '/pg4', name: 'OOP' },
	{ path: '/pg5', name: 'Cookie' },
]
// Вспомагательные ссылки
const linkAux: TLink[] = [
	{
		path: '/login',
		name: 'Войти',
		border: true,
	},
]
