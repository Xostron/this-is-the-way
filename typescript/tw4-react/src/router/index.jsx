import { createBrowserRouter } from 'react-router-dom'
import Main, { rootLoader } from '@src/page/main'
import PC, { pcLoader } from '@src/page/pc'
import Login from '@page/login'

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	// Список всех PC
	{
		path: '/',
		element: <Main />,
		// children: [{ path: 'pc/:pcId', element: <PC />, loader: pcLoader }],
	},
	// Отдельные PC
	// {
	// 	path: 'pc/:id',
	// 	element: <PC />,
	// 	children: [],
	// },
])

export default router
