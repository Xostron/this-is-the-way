import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

const Line = ({ data }) => {
	const svgRef = useRef()

	// Ширина столбика гистограммы
	const barWidth = 20
	const width = 928
	const height = 720
	const marginTop = 20
	const marginRight = 30
	const marginBottom = 30
	const marginLeft = 40

	useEffect(() => {
		d3.select(svgRef.current).selectAll('*').remove()
		// svg - контейнер
		const svg = d3.select(svgRef.current).attr('width', width).attr('height', height).append('g')
		// ************************************************************
		// Шкала Х
		const x = d3
			.scaleLinear()
			.domain(d3.extent(data, (d) => d.miles))
			.nice()
			.range([marginLeft, width - marginRight])

		const y = d3
			.scaleLinear()
			.domain(d3.extent(data, (d) => d.gas))
			.nice()
			.range([height - marginBottom, marginTop])
		// ************************************************************
		// График
		svg.line()
			.curve(d3.curveCatmullRom)
			.x((d) => x(d.miles))
			.y((d) => y(d.gas))

		d3.select(svgRef)
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [0, 0, width, height])
			.attr('style', 'max-width: 100%; height: auto;')

		// const length = (path) => svg.attr('d', path).node().getTotalLength()
		// const l = length(line(data))
	}, [])

	return (
		<>
			<svg ref={svgRef}></svg>
		</>
	)
}

export default Line
