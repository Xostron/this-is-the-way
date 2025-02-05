import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import World from '../../cmp/d3/world'
import Bar from '../../cmp/d3/bar'
const data = [20, 100, 60, 40, 70]

const Boost = () => {
	return (
		<main className='page'>
			<section className='content'>
				{/* <World /> */}
				<Bar/>
			</section>
		</main>
	)
}

export default Boost
