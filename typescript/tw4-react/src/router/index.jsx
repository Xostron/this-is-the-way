import { createBrowserRouter } from 'react-router-dom'
// import 

const router = createBrowserRouter([
	// Список всех PC
	{
		path: '/',
		element: <Main />,
		loader: rootLoader,
		children: [{ path: 'pc', element: <PC />, loader: pcLoader }],
	},
	// Отдельные PC
	// {
	// 	path: 'pc/:id',
	// 	element: <PC />,
	// 	children: [],
	// },

])

export default router
