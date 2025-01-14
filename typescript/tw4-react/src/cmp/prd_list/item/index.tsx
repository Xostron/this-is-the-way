import React, { FC, useState } from 'react'
import { Prd } from '@tool/product'

type Props = {
	prd: Prd
	cb: (prd: Prd, count: number) => void
}

/**
 * Элемент списка продкутов
 * @param props
 * @returns
 */
const PrdItem: FC<Props> = (props) => {
	const { prd, cb } = props
	const [count, setCount] = useState<number>(1)

	return (
		<article>
			<h4>
				{prd.name}
				<span>${prd.price.toFixed(2)}</span>
			</h4>
			<div>
				{prd.desc}
				<button onClick={() => cb(prd, count)}>+</button>
			</div>
			<select name='' id='' onChange={(e) => setCount(Number(e.target.value))}>
				<option value='1'>1</option>
				<option value='2'>2</option>
				<option value='3'>3</option>
			</select>
		</article>
	)
}

export default PrdItem
