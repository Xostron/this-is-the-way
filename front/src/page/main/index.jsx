import Nav from '@cmp/nav'
import Footer from '@cmp/footer'
import '@page/style.css'

const Main = () => {
	return (
		<main className='page'>
			{/* <Nav list={[1,2,3]}/>
      Main
      <Footer/> */}

			<div style={{ gridArea: '1 / 1 / 1 / 1', width: '100%', backgroundColor: '#092327' }}>1</div>
			<div style={{ gridArea: '1 / 2 / 1 / 2', width: '100%', backgroundColor: '#092347' }}>2</div>
			<div style={{ gridArea: '1 / 3 / 1 / 3', width: '100%', backgroundColor: '#092367' }}>3</div>
			
			<div style={{ gridArea: '2 / 1 / 2 / 1', width: '100%', backgroundColor: '#0a1128' }}>4</div>
			<div style={{ gridArea: '2 / 2 / 2 / 2', width: '100%', backgroundColor: '#0a1148' }}>5</div>
			<div style={{ gridArea: '2 / 3 / 2 / 3', width: '100%', backgroundColor: '#0a1168' }}>6</div>

			<div style={{ gridArea: '3 / 1 / 3 / 1', width: '100%', backgroundColor: '#5a5323' }}>4</div>
			<div style={{ gridArea: '3 / 2 / 3 / 2', width: '100%', backgroundColor: '#5a5343' }}>5</div>
			<div style={{ gridArea: '3 / 3 / 3 / 3', width: '100%', backgroundColor: '#5a5363' }}>6</div>
		

		
		</main>
	)
}

export default Main
