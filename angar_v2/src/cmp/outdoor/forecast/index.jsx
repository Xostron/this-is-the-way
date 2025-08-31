import { useParams } from 'react-router-dom'
import useInputStore from '@store/input'
import useEquipStore from '@store/equipment'
import Today from './today'
import './style.css'

export default function Forecast({}) {
	const { build } = useParams()
	const address = useEquipStore((s) => s.build()?.pc?.address?.value)
	const type = useEquipStore((s) => s.getType(build))
	const weather = useEquipStore((s) => s.weather)
	const updateTime = new Date(weather.update).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })
	// let cl = type === 'cold' ? 'weather-fore forecast-cold' : 'weather-fore'

	return (
		<article className={'cmp-outdoor-forecast'}>
			{address ? (
				<div className='adr'>
					<img src='/img/geo.svg' />
					<span>{address ?? '--'}</span>
				</div>
			) : null}
			<Today weather={weather} type={type} />
			<span className='upd'>{updateTime}</span>
		</article>
	)
}
