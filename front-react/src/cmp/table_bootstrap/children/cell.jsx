function Cell({ o = {} }) {
	if (!o || !Object.keys(o)?.length) return <td></td>
	return <td>{o.name}</td>
}

export default Cell
