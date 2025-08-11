import { createBrowserRouter, Navigate, redirect } from 'react-router'
import Main from '@src/page/main'
import NotFound from '@page/not_found'
import childMain from './child_main'

const router = createBrowserRouter([
	
	// Main - Список PC
	{
		path: '/',
		element: <Main />,
		children: childMain,
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
