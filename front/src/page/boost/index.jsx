import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import World from '../../cmp/d3/world'
import Bar from '../../cmp/d3/bar'
import Line from '../../cmp/d3/line'
const data = [{name:'20.02.2025',value:10}, {name:'21.02.2025',value:5},{name:'22.02.2025',value:15}]

const Boost = () => {
	return (
		<main className='page'>
			<section className='content'>
				{/* <World /> */}
				<Bar data={data}/>
				{/* <Line /> */}
			</section>
		</main>
	)
}

export default Boost
