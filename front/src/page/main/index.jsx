import Nav from '@cmp/nav'
import Footer from '@cmp/footer'
import List from './list'
import './style.css'



const Main = () => {
	
	console.log('main')
	return (
		<main className='page'>
			<div className='header'>1</div>
			<div className='content'>
				<List/>
			</div>
			<div className='asidel'>3</div>
			<div className='asider'>4</div>
			<div className='footer'>5</div>
		</main>
	)
}

export default Main
