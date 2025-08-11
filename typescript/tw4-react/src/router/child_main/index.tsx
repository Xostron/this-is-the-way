import LazyList from '@src/page/main/lazy_list'
import Login from '@page/login'
import PC from '@src/page/pc'
import Dom from '@src/page/dom'
import loaderMain from '../utils/loader_main'

const children = [
	// Логин
	{
		path: '/login',
		element: <Login />,
	},
	// Список PC
	{
		path: '',
		element: <LazyList />,
		loader: loaderMain,
	},
	// PC
	{
		path: 'pc/:id',
		element: <PC />,
		children: [],
	},
	// DOM
	{
		path: 'dom',
		element: <Dom />,
	},
]

export default children
