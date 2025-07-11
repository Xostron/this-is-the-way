import './style.css'

interface IProps {
	type?: string
}

function Loader(props: IProps) {
	let cl: string[] | string = ['cmp-loader']
	if (props.type == 'horizont') cl.push('cmp-loader-hor-center')
	if (props.type == 'vertical') cl.push('cmp-loader-vert-center')
	cl = cl.join(' ')
	return <div style={{ color: props.type }}>...Данные загружаются</div>
	// return <div className={cl}></div>
}

export default Loader
