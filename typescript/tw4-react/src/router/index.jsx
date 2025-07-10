import { createBrowserRouter, Navigate } from 'react-router'
import Login from '@page/login'
import Main from '@src/page/main'
import PC from '@src/page/pc'
import NotFound from '@page/not_found'

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
		loader: ({ context, params, request }) => {
			console.log(222, { context, params, request })
		},
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
