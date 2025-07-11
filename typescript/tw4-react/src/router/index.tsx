import { createBrowserRouter, Navigate, redirect } from 'react-router'
import Login from '@page/login'
import Main from '@src/page/main'
import PC from '@src/page/pc'
import NotFound from '@page/not_found'
import fetchCompanies from '@api/company'
import delay from '@util/delay'
import Loader from '@cmp/loader'
import ListCompany from '@src/cmp/list/company'
import LazyList from '@src/page/lazy_list'
import BaseLayout from '@src/cmp/base_layout'

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
			{
				index: true,
				element: <Navigate to={'company'} />,
			},
			{
				path: 'company',
				element: <BaseLayout />,
				children: [
					{
						index: true,
						element: <Navigate to={'a'} />,
					},
					{
						path: 'a',
						element: <LazyList />,
						loader: async ({ context, params, request }) => {
							try {
								const list = delay(3000)
								// const r = await fetchCompanies()
								console.log('loader path:/', list)
								return {list}
							} catch (error) {
								console.log(1111, error)
								return redirect('/login')
							}
						},
						// hydrateFallbackElement: <Loader type='green' />,
					},
				],
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
