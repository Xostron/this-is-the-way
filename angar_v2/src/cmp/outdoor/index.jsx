import Sensor from '@cmp/sensor'
import Weather from '@cmp/weather'
import useEquipStore from '@store/equipment'
import useInputStore from '@store/input'
import Owner from '../outdoor/owner'
import Forecast from './forecast'
import Item from './value'
import AccelFan from './accel'
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
			<Owner stl={stl.owner} />
			{/* Погода интернет */}
			<Forecast stl={stl.forecast} />
			<article style={stl.out} className='cmp-outdoor-out'>
				{/* Датчики улицы:темп */}
				<Item type='tout' label='Улица' stl={stl.tout} />
				{/* Датчики улицы: влажность отн */}
				<Item type='hout' subkey='max' stl={stl.hout} />
				{/* Датчики улицы: влажность абс */}
				<Item type='calcMois' subkey='out' stl={stl.calcMoisOut} />
			</article>
			<article style={stl.in} className='cmp-outdoor-in'>
				{/* Датчик склада: Темп продукта мин */}
				<Item type='tprd' label='Продукт' stl={stl.tprd} />
				{/* Датчик склада: Влажность продукта макс отн  */}
				<Item type='hin' subkey='max' stl={stl.hin} />
				{/* Датчик склада: Влажность продукта макс абс */}
				<Item type='calcMois' subkey='in' stl={stl.calcMoisIn} />
			</article>

			{/* Разгонный вентилятор */}
			<AccelFan label='Разгонный' stl={stl.accel} />
			{/* Датчик склада: Темп потолка */}
			<Item type='tin' label='Потолок' stl={stl.tin} />
			{/* Точка росы */}
			<Item type='point' label='Точка росы' stl={stl.point} />
		</section>
	)
}

const stl = {
	owner: { gridArea: '1/1/1/4' },
	forecast: { gridArea: '2/1/4/4', backgroundColor: 'var(--backdrop3)' },

	out: { gridArea: '4/1/4/5', backgroundColor: 'var(--backdrop1)' },
	in: { gridArea: '5/1/5/5', backgroundColor: 'var(--backdrop1)' },

	tout: {}, //{ gridArea: '4/1/4/1' },
	hout: {}, //{ gridArea: '4/2/4/2' },
	calcMoisIn: {}, //{ gridArea: '4/3/4/3' },
	tprd: {}, //{ gridArea: '5/1/5/1' },
	hin: {}, //{ gridArea: '5/2/5/2' },
	calcMoisOut: {}, //{ gridArea: '5/3/5/3' },

	tin: { gridArea: '2/4/2/4', backgroundColor: 'var(--backdrop3)' },
	point: { gridArea: '3/4/3/4', backgroundColor: 'var(--backdrop3)' },
	accel: { gridArea: '1/4/1/4' },
}
