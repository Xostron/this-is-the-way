import { useParams } from 'react-router-dom'
import useInputStore from '@store/input'
import useWarn from '@store/warn'


export default function Today({ weather, type }) {
	const { build } = useParams()
	const tweather = useInputStore((s) => s.input?.[build]?.tweather)
	const warn = useWarn((s) => s.warn)
	const img = weather.code ? <img src={`/img/weather/${weather.code}.svg`} alt={weather.weather} /> : null
	const dt = new Date(weather.time).toLocaleString('ru', { day: '2-digit', month: '2-digit' })

	return (
		<>
			<article className='today' onClick={onClick}>
				<div>
					<span className='status'>{weather.weather ?? ''}</span>
					<span className='temp' title={dt}>
						{tweather?.value ?? '--'}°C
					</span>
					<span>Влажность: {weather.humidity ?? '--'}%</span>
				</div>
				{img}
			</article>
		</>
	)
    function onClick() {
		warn({ weather, type }, 'forecast_analytic')
	}
}
