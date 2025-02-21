import { useState } from 'react'
import './style.css'
import Tab from './tab'

export default function Card({ card }) {
	const [ num, setNum ] = useState(0)
	return (
		<article className='cmp-card-wrapper'>
			<Tab tabs={card.tab} num={num} set={setNum} />
			<article className='cmp-card'>
				<h1>{card.title}</h1>
				<div>{card.text}</div>
			</article>
		</article>
	)
}
