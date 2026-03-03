function Cell({ obj = {} }) {
	if (!obj || !Object.keys(obj)?.length) return <td></td>
	return <td>{obj.value}</td>
}

export default Cell
