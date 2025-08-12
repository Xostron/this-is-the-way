import LazyList from '@src/page/main/lazy_list'
import Login from '@page/login'
import PC from '@src/page/pc'
import Dom from '@src/page/dom'
import loaderMain from '../utils/loader_main'
import PageClick from '@src/page/page_click'
import GeoMap from '@src/page/geo_map'

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
		path: 'pg1',
		element: <Dom />,
	},
	// Event Click
	{
		path: 'pg2',
		element: <PageClick />,
	},
	// Geo Map
	{
		path: 'pg3',
		element: <GeoMap />,
	},
]

export default children
