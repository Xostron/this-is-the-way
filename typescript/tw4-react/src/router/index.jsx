import { createBrowserRouter } from 'react-router'
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
		element: <NotFound />,
	},
])

export default router
