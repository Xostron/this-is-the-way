import Item from './item'

export default function Nav() {
	return (
		<nav className='page-service-nav'>
			{lists.map((el) => (
				<Item key={el.path} data={el} />
			))}
		</nav>
	)
}

const lists = [
	{
		path: '../service/1',
		icon: '/img/service/wifi.svg',
		name: 'Настройки сети',
	},
	{
		path: '../service/3',
		icon: '/img/service/network-2.svg',
		name: 'Обновить ПО',
	},
	{
		path: '../service/2',
		icon: '/img/service/project-configuration.svg',
		name: 'Конфигурация',
	},
	
	{
		path: '../service/4',
		icon: '/img/service/laptop.svg',
		name: 'Управление POS',
	},
	{ path: '../service/journal', icon: '/img/service/journal.svg', name: 'Архив действий' },
	{
		path: '..',
		icon: '/img/arrow-right.svg',
		name: 'Выйти',
	},
]
