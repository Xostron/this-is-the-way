import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

const Bar = () => {
	const svgRef = useRef()

	const data = [20, 100, 60, 40, 70]
	// Ширина столбика гистограммы
	const barWidth = 20
	useEffect(() => {
		const svg = d3.select(svgRef.current).selectAll('rect').data(data).enter()
		svg.append('rect')
			.attr('width', barWidth)
			.attr('height', (d) => d)
			.attr('x', (d, i) => barWidth * i)
			.attr('fill', (d) => 'red')

		d3.select('ul')
			.selectAll('li')
			.data(data)
			.enter()
			.append('li')
			.on('click', function (d) {
				d3.select(this).remove()
			})
	}, [])

	return (
		<>
			<svg ref={svgRef} width='160' height='130'></svg>
			<ul></ul>
		</>
	)
}

export default Bar
