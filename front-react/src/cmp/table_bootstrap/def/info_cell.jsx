function Cell({ obj = {} }) {
	if (!obj || !Object.keys(obj)?.length) return <td></td>
	return (
		<td>
			<span>Имя: {obj.value ?? ''}</span>
			<span>Текущая цена:{obj.price ?? ''}</span>
			<span>Номинал:{obj.par ?? ''}</span>
			<span>Количество:{obj.count ?? ''}</span>
			<span>Купон:{obj.coupon ?? ''}</span>

			<span>Длительность: {obj.duration ?? ''}</span>
			<span>
				от {obj.from ?? ''} до {obj.to ?? ''}
			</span>
		</td>
	)
}

export default Cell
