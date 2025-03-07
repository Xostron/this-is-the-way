import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import './style.css'

// Гистограмма
const Bar = ({ width = 500, height = 300, data }) => {
	const svgRef = useRef()
	// Размеры
	const margin = { top: 30, right: 20, bottom: 40, left: 40 }
	const innerW = width - margin.left - margin.right
	const innerH = height - margin.top - margin.bottom
	const paddingBar = 5

	useEffect(() => {
		// Очистка предыдущего графика
		d3.select(svgRef.current).selectAll('*').remove()
		// svg - контейнер
		const svg = d3.select(svgRef.current).attr('width', width).attr('height', height).append('g')

		// ************************************************************
		// Шкала X - категории
		const xScale = d3
			.scaleBand()
			.domain(data.map((d) => d.name))
			.range([0, innerW])
			.padding(1)
		// Ширина столбика гистограммы
		const barWidth = data?.length ? data.map((el) => xScale(el.name))[0] - paddingBar : 0

		// Шкала Y - значение
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value)])
			.range([innerH, 0])
			.nice()

		// ************************************************************
		// Линия Ось X
		svg.append('g')
			.attr('transform', `translate(${margin.left},${innerH + 20})`)
			.call(d3.axisBottom(xScale))
		// Линия Ось Y - 5 засечек
		const yAxis = d3.axisLeft(yScale).ticks(5)
		svg.append('g').attr('transform', `translate(${margin.left},${20})`).call(yAxis)

		// ************************************************************
		// Подпись оси X
		svg.append('text')
			.attr('transform', `translate(${innerW / 2 + margin.left},${height - margin.bottom / 3})`)
			.style('text-anchor', 'middle')
			.text('Значения')
			.attr('fill', 'white')
		// Подпись  оси Y
		svg.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('x', -height / 2)
			.attr('y', margin.left / 2.5)
			.style('text-anchor', 'middle')
			.text('Частота')
			.attr('fill', 'white')

		// ************************************************************
		// График
		svg.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', (d, i) => xScale(d.name))
			.attr('y', (d) => yScale(d.value))
			.attr('width', (d) => barWidth)
			.attr('height', (d) => innerH - yScale(d.value))
			.attr('transform', (d) => `translate(${margin.left - barWidth / 2},${margin.bottom / 2})`)
			.attr('fill', 'steelblue')
	}, [])

	return (
		<>
			<svg
				className='svg-border'
				ref={svgRef}
				// width={barWidth * data.length}
				// height='150'
			></svg>
			<ul></ul>
		</>
	)
}

export default Bar
