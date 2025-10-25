import { Navigate } from 'react-router'
import LazyList from '@src/page/main/lazy_list'
import Login from '@page/login'
import PC from '@src/page/pc'
import Dom from '@src/page/dom'
import loaderMain from '../utils/loader_main'
import PageClick from '@src/page/page_click'
import GeoMap from '@src/page/geo_map'
import OOP from '@src/page/oop'
import Cookie from '@src/page/cookie'

const children = [
	// Редирект на стартовую страницу
	{
		path: '',
		element: <Navigate to='/pg2' replace={true} />,
	},
	// Список PC
	{
		path: '/main',
		element: <LazyList />,
		loader: loaderMain,
	},
	// Логин
	{
		path: '/login',
		element: <Login />,
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
	// ООП Прототипы
	{
		path: 'pg4',
		element: <OOP />,
	},
	// Cookie
	{
		path: 'pg5',
		element: <Cookie />,
	},
]

export default children
