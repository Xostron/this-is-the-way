const Achieve = () => {
	return (
		<main className='page'>
			{/* Achieve */}
			<section className='content'>
				<svg width='30px' height='30px'>
					<rect width='30px' height='30px' fill='white'></rect>
				</svg>

				<svg width='30px' height='30px'>
					<circle cx='15px' cy='15px' r='15' fill='white'></circle>
				</svg>

				<svg width='35px' height='30px'>
					<path d='M0,0L0,30L35,30' fill='white'></path>
				</svg>

				<svg width='30px' height='30px'>
					<path d='M0,0l0,30l30,0' fill='white'></path>
				</svg>

				{/* Кривые безье */}
				<svg width='110px' height='110px'>
					<path
						d='M0 100 C 0 100, 10 -100, 20 100,    
					  				C 20 100, 30 -100, 40 100,
									  C 40 100, 60 -100, 60 100,'
						stroke='white'
						fill='none'
					/>
					<circle cx='0px' cy='100px' r='3' fill='white'></circle>
					<circle cx='10px' cy='10px' r='3' fill='white'></circle>
					<circle cx='20px' cy='100px' r='3' fill='white'></circle>

					<circle cx='30px' cy='10px' r='3' fill='white'></circle>
					<circle cx='40px' cy='100px' r='3' fill='white'></circle>

					<circle cx='50px' cy='10px' r='3' fill='white'></circle>
					<circle cx='60px' cy='100px' r='3' fill='white'></circle>
				</svg>


				{/* Ломаная линия */}
				<svg width='110px' height='110px'>
					<polyline fill='none' stroke='white' stroke-width='2' points='0,100 20,10 40,80 60,50' />
					<circle cx='0px' cy='100px' r='3' fill='white'></circle>
					<circle cx='20px' cy='10px' r='3' fill='white'></circle>
					<circle cx='40px' cy='80px' r='3' fill='white'></circle>
					<circle cx='60px' cy='50px' r='3' fill='white'></circle>
				</svg>
			</section>
		</main>
	)
}

export default Achieve
