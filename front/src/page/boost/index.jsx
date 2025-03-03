import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import World from '../../cmp/d3/world'
import Bar from '../../cmp/d3/bar'
import Line from '../../cmp/d3/line'
const data = [
	{ name: '20.02.2025', value: 10 },
	{ name: '21.02.2025', value: 5 },
	{ name: '22.02.2025', value: 15 },
]

const Boost = () => {
	return (
		<main className='page'>
			<section className='content'>
				{/* <World /> */}
				<Bar data={data} />
				{/* <Line /> */}
				<p>{dewpoint()}</p>
			</section>
		</main>
	)
}

export default Boost


/**
 * Точка росы
 * https://poliol.ru/cont/articles/3-sposoba-rascheta-tochki-rosy-pri-uteplenii-pomeshcheniya/
 * @returns 
 */
function dewpoint() {
	const q = 17.27
	const b = 237.7
	const t = 25
	const w = 50
	const ln = (q * t) / (b + t) + Math.log(w / 100)
	return (b * ln) / (q - ln)
}
