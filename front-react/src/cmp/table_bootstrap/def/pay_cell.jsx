function Cell({ obj = {} }) {
	if (!obj || !Object.keys(obj)?.length) return <td></td>
	return (
		<td>
			<span>{obj.value}</span>
			<span>{obj.dtCoupon}</span>
		</td>
	)
}

export default Cell
