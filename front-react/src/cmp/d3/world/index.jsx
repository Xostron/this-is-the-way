import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

const World = () => {
	const svgRef = useRef()

	useEffect(() => {
		const svg = d3.select(svgRef.current)
		const width = +svg.attr('width')
		const height = +svg.attr('height')

		const path = d3.geoPath()
		const projection = d3
			.geoMercator()
			.scale(200)
			.center([0, 0])
			.translate([width / 2, height / 2])

		const colorScale = d3.scaleThreshold().domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000]).range(d3.schemeBlues[7])

		Promise.all([
			d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
			d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv'),
		]).then(([topology, population]) => {
			const data = new Map()
			population.forEach((d) => data.set(d.code, +d.pop))

			svg.selectAll('path')
				.data(topology.features)
				.join('path')
				.attr('d', path.projection(projection))
				.attr('fill', (d) => {
					const total = data.get(d.id) || 0
					return colorScale(total)
				})
		})
	}, [])

	return <svg ref={svgRef} width='1600' height='1300' />
}

export default World
