import { createBrowserRouter } from 'react-router'
import Main from '@src/page/main'
import NotFound from '@page/not_found'
import childMain from './child_main'

const router = createBrowserRouter([
	// Каталог
	{
		path: '/',
		element: <Main />,
		children: childMain,
	},
	// 404
	{
		path: '*',
		element: <NotFound />,
	},
])

export default router
