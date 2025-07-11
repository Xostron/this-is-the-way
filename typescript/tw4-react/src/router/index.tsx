import { createBrowserRouter, Navigate, redirect } from 'react-router'
import Login from '@page/login'
import Main from '@src/page/main'
import PC from '@src/page/pc'
import NotFound from '@page/not_found'
import fetchCompanies from '@api/company'
import delay from '@util/delay'
import Loader from '@cmp/loader'

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
		loader: async ({ context, params, request }) => {
			try {
				await delay(5000)
				const r = await fetchCompanies()
				console.log('loader path:/', r)
				return r
			} catch (error) {
				console.log(1111, error)
				return redirect('/login')
			}
		},
		// hydrateFallbackElement: <Loader type='vertical' />,
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
