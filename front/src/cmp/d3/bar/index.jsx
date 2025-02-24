import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import './style.css'

const Bar = () => {
	const svgRef = useRef()

	const data = [
		{ name: '20.02.2024', value: 10 },
		{ name: '21.02.2024', value: 7 },
		{ name: '22.02.2024', value: 15 },
	]

	// Размеры
	const width = 600
	const height = 400
	const margin = { top: 20, right: 20, bottom: 30, left: 40 }
	const innerW = width - margin.left - margin.right
	const innerH = height - margin.top - margin.bottom

	// Ширина столбика гистограммы
	const barWidth = 50

	useEffect(() => {
		// Очистка предыдущего графика
		d3.select(svgRef.current).selectAll('*').remove()
		// svg - контейнер
		const svg = d3.select(svgRef.current).attr('width', width).attr('height', height).append('g')

		// Шкалы
		const xScale = d3
			.scaleBand()
			.domain(data.map((d) => d.name))
			.range([0, innerW])
			.padding(0.1)

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value)])
			.range([innerH, 0])
			.nice()

		// Оси
		svg.append('g')
			.attr('transform', `translate(${margin.left},${20})`)
			.call(d3.axisLeft(yScale))

		svg.append('g')
			.attr('transform', `translate(${margin.left},${innerH + 20})`)
			.call(d3.axisBottom(xScale))

		// График
		svg.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', (d, i) => xScale(d.name))
			.attr('y', (d) => yScale(d.value))
			.attr('transform', `translate(${90},${margin.top})`)
			.attr('width', barWidth)
			.attr('height', (d) => innerH - yScale(d.value))
			.attr('fill', 'steelblue')

		// // Подписи осей
		svg.append('text')
			.attr('transform', `translate(${width / 2},${height - 10})`)
			.style('text-anchor', 'middle')
			.text('Значения')
			.attr('fill', 'white')

		svg.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('x', -height / 2)
			.attr('y', 20)
			.style('text-anchor', 'middle')
			.text('Частота')
			.attr('fill', 'white')
	}, [])

	return (
		<>
			<svg className='svg-border' ref={svgRef} width={barWidth * data.length} height='150'></svg>
			<ul></ul>
		</>
	)
}

export default Bar
