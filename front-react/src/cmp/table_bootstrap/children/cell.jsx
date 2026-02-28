function Cell({ data = {} }) {
	if (!data || !Object.keys(data)?.length) return <td></td>
	return <td>{data.name}</td>
}

export default Cell
