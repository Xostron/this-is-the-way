import './style.css'

interface IProps {
	type?: string | number
}

function Loader(props: IProps) {
	const { type = 4 } = props
	const cl : string= `cmp-loader${type}`
	return <div className={cl}></div>
}

export { Loader }
