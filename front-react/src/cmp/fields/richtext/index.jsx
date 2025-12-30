import './style.css'

function Richtext({ placeholder, width, height, title, value, setValue, cls }) {
	let cl = ['cmp-fields-rt-wrapper', cls]
	cl = cl.join(' ')
	return (
		<label className={cl} contenteditable='true'>
			<header className='cmp-fields-rt-header'>
				<span>{title}</span>
				<button onClick={onBold}>B</button>
			</header>
			<ul contenteditable='true'>
				<li>1</li>
				<li>1</li>
				<li>1</li>
				<li>1</li>
				<li>1</li>
			</ul>
		</label>
	)

	function onBold(e) {
		console.log(2)
	}
}

export default Richtext
