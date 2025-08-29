import List from './list'
import './style.css'

// Горизонтальный вид
export default function MainNav() {
	return (
		<nav className='cmp-mainnav-content'>
			<List list={list} />
		</nav>
	)
}

//Список меню склада
const list = [
	{
		id:1,
		title: 'Склады',
		path: '/',
		icon: '/img/menu/all.svg',
		active: []
	},
	{
		id:2,
		title: 'Склад',
		path: 'building',
		icon: '/img/menu/building.svg',
		active: [null, 'section']
		
	},
	{
		id:3,
		title: 'Датчики',
		path: 'sensor/all',
		icon: '/img/menu/sensor.svg',
		active: ['sensor']
	},
	{
		id:4,
		title: 'Сигналы',
		path: 'signal',
		icon: '/img/menu/signal.svg',
		active: ['signal']
	},
	{
		id:5,
		title: 'Настройки',
		path: 'settings/menu',
		icon: '/img/menu/settings.svg',
		active: ['settings']
	},
	{
		id:6,
		title: 'Отчеты',
		path: 'report',
		icon: '/img/menu/report.svg',
		active: ['report']
	},
	// {
	// 	id:7,
	// 	title: 'C',
	// 	path: 'service',
	// 	icon: '/img/menu/report.svg',
	// 	active: ['service']
	// },
]