import def from './def/def'

export default function Def({ type, stl }) {
	const Component = def[type]
	if (!Component) return null
	return <Component stl={stl} />
}
