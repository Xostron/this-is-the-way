import Sensor from '@cmp/sensor'
import Weather from '@cmp/weather'
import useEquipStore from '@store/equipment'
import useInputStore from '@store/input'
import Owner from '../outdoor/owner'
import Forecast from './forecast'
import './style.css'

//Параметры улицы(погода, датчики)
export default function Outdoor() {
	const build = useEquipStore((s) => s.build())
	const section = useEquipStore((s) => s.section())
	const type = useEquipStore((s) => s.curType())

	const getTotalBy = useInputStore((s) => s.getTotalBy)
	const getFan = useInputStore((s) => s.getFan)
	const humAbs = useInputStore((s) => s.input?.humAbs)

	if (!build) return null

	// Внутри склада
	const sens = [
		// Температура потолка (мин) и Разгонный вентилятор
		{ type: 'tin', ...getTotalBy('tin', 'min', build?._id), fan: getFan(build?.fan?.[0]) },
		// Влажность продукта (макс)
		{ type: 'hin', ...getTotalBy('hin', 'max', build?._id) },
	]
	// Холодильник. датчик со2
	if (type === 'cold') sens.push({ type: 'co2', ...getTotalBy('co2', 'min', section?._id) })
	// Абс влажность продукта
	else sens.push({ type: 'calcMois', value: humAbs?.in?.[build?._id] })

	return (
		<section className='cmp-outdoor'>
			{/* Код склада и компания */}
			{/* Дата и Время */}
			<Owner />
			{/* Погода интернет */}
			<Forecast />
			{/* Датчики улицы:темп */}
			{/* Датчики улицы: влажность отн и абс */}
			{/* Датчик склада: Темп потолка */}
			{/* Датчик склада: Темп продукта мин */}
			{/* Датчик склада: Влажность продукта макс отн и абс */}
			{/* Точка росы */}
			{/* Адрес склада */}
			{/* <Weather /> */}
			{/* <Sensor data={sens} cls={'cmp-outdoor-sens'} withImg={true} /> */}
		</section>
	)
}
