import './style.css'

interface IProps {
	type?: string
}

function Loader(props: IProps) {
	const {type='horizont'} = props
	let cl: string[] | string = ['cmp-loader']
	if (type == 'horizont') cl.push('cmp-loader-hor-center')
	if (type == 'vertical') cl.push('cmp-loader-vert-center')
	cl = cl.join(' ')
	return <div className={cl}></div>
}

export default Loader
