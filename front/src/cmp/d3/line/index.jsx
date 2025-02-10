import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

const Line = () => {
	const svgRef = useRef()

	const driving = [
		{ side: 'left', year: 1956, miles: 3683.6965, gas: 2.3829 },
		{ side: 'right', year: 1957, miles: 3722.7648, gas: 2.4026 },
		{ side: 'bottom', year: 1958, miles: 3776.8595, gas: 2.2539 },
		{ side: 'top', year: 1959, miles: 3912.0962, gas: 2.3079 },
		{ side: 'right', year: 1960, miles: 3942.1488, gas: 2.2658 },
		{ side: 'bottom', year: 1961, miles: 3984.2224, gas: 2.2526 },
		{ side: 'right', year: 1962, miles: 4089.4064, gas: 2.2158 },
		{ side: 'bottom', year: 1963, miles: 4230.6536, gas: 2.1237 },
		{ side: 'bottom', year: 1964, miles: 4383.9219, gas: 2.1039 },
		{ side: 'bottom', year: 1965, miles: 4546.2059, gas: 2.1368 },
		{ side: 'top', year: 1966, miles: 4681.4425, gas: 2.1421 },
		{ side: 'bottom', year: 1967, miles: 4837.716, gas: 2.1408 },
		{ side: 'right', year: 1968, miles: 5048.0841, gas: 2.1263 },
		{ side: 'right', year: 1969, miles: 5216.3787, gas: 2.0737 },
		{ side: 'right', year: 1970, miles: 5384.6732, gas: 2.0118 },
		{ side: 'bottom', year: 1971, miles: 5652.1412, gas: 1.9316 },
		{ side: 'bottom', year: 1972, miles: 5979.7145, gas: 1.8737 },
		{ side: 'right', year: 1973, miles: 6160.0301, gas: 1.9026 },
		{ side: 'left', year: 1974, miles: 5946.6566, gas: 2.3447 },
		{ side: 'bottom', year: 1975, miles: 6117.9564, gas: 2.3079 },
	]
	// Ширина столбика гистограммы
	const barWidth = 20
	const width = 928
	const height = 720
	const marginTop = 20
	const marginRight = 30
	const marginBottom = 30
	const marginLeft = 40
	useEffect(() => {
		const x = d3
			.scaleLinear()
			.domain(d3.extent(driving, (d) => d.miles))
			.nice()
			.range([marginLeft, width - marginRight])

		const y = d3
			.scaleLinear()
			.domain(d3.extent(driving, (d) => d.gas))
			.nice()
			.range([height - marginBottom, marginTop])

		const line = d3
			.line()
			.curve(d3.curveCatmullRom)
			.x((d) => x(d.miles))
			.y((d) => y(d.gas))

		const svg = d3
			.select(svgRef)
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [0, 0, width, height])
			.attr('style', 'max-width: 100%; height: auto;')

		// const length = (path) => svg.attr('d', path).node().getTotalLength()
		// const l = length(line(driving))
	}, [])

	return (
		<>
			<svg ref={svgRef}></svg>
		</>
	)
}

export default Line
