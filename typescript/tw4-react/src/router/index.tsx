import { createBrowserRouter, Navigate, redirect } from 'react-router'
import Login from '@page/login'
import Main from '@src/page/main'
import PC from '@src/page/pc'
import NotFound from '@page/not_found'
import fetchCompanies from '@api/company'
import LazyList from '@src/page/lazy_list'

const router = createBrowserRouter([
	// Логин
	{
		path: '/login',
		element: <Login />,
	},
	// Список PC
	{
		path: '/',
		element: <Main />,
		children: [
			// При загрузке делает редирект
			// {
			// 	index: true,
			// 	element: <Navigate to={'company'} />,
			// },
			{
				path: '',
				element: <LazyList />,
				loader: ({ context, params, request }) => {
					const list = fetchCompanies()
					console.log('loader path:/', list)
					return { list }
				},
			},
		],
	},
	// PC
	{
		path: 'pc/:id',
		element: <PC />,
		children: [],
	},
	// 404
	{
		path: '*',
		element: <Navigate to='/notfound' replace={true} />,
	},
	{
		path: '/notfound',
		element: <NotFound />,
	},
])

export default router
