import './style.css'

const Main = () => {
	console.log(111, process.env.PUBLIC_APP_URI)

	
	return (
		<main className='page'>
			<section className='header'>1</section>
			<section className='content'>
				<h1>2</h1>

			</section>
			<section className='asidel'>3</section>
			<section className='asider'>4</section>
			<section className='footer'>5</section>
		</main>
	)
}

export default Main

