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
	return (
		<section className='cmp-outdoor'>
			{/* Код склада и компания + Дата и Время*/}
			<Owner stl={stl.owner} />
			{/* Погода интернет */}
			<Forecast stl={stl.forecast} />
			<article style={stl.out} className='cmp-outdoor-sens'>
				{/* <span>Улица</span> */}
				{/* Датчики улицы:темп */}
				<Item type='tout' label='Улица' stl={stl.tout} highlight />
				{/* Датчики улицы: влажность отн */}
				<Item type='hout' subkey='max' stl={stl.hout} />
				{/* Датчики улицы: влажность абс */}
				<Item type='humAbs' subkey='out' stl={stl.humAbsOut} />
			</article>
			<article style={stl.in} className='cmp-outdoor-sens'>
				{/* <span>Продукт</span> */}
				{/* Датчик склада: Темп продукта мин */}
				<Item type='tprd' label='Продукт' stl={stl.tprd} highlight />
				{/* Датчик склада: Влажность продукта макс отн  */}
				<Item type='hin' subkey='max' stl={stl.hin} />
				{/* Датчик склада: Влажность продукта макс абс */}
				<Item type='humAbs' subkey='in' stl={stl.humAbsIn} />
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
	forecast: { gridArea: '2/1/4/4', backgroundColor: 'var(--backdrop2)' },

	out: { gridArea: '4/1/4/5', backgroundColor: 'var(--backdrop3)' },
	in: { gridArea: '5/1/5/5', backgroundColor: 'var(--backdrop3)' },

	tout: {}, //{ gridArea: '4/1/4/1' },
	hout: {}, //{ gridArea: '4/2/4/2' },
	humAbsIn: {}, //{ gridArea: '4/3/4/3' },
	tprd: {}, //{ gridArea: '5/1/5/1' },
	hin: {}, //{ gridArea: '5/2/5/2' },
	humAbsOut: {}, //{ gridArea: '5/3/5/3' },

	tin: { gridArea: '2/4/2/4', backgroundColor: 'var(--backdrop3)' },
	point: { gridArea: '3/4/3/4', backgroundColor: 'var(--backdrop3)' },
	accel: { gridArea: '1/4/1/4', backgroundColor: 'var(--backdrop3)' },
}
