import { FC } from 'react'

interface Props {
	selected: string
	ctg: string[]
	selCtg: (ctg: string) => void
}

/**
 * Элемент списка категорий
 * @param props 
 * @returns 
 */
const CtgList: FC<Props> = (props) => {
	const { selected, ctg, selCtg } = props
	return (
		<article>
			{['Все', ...ctg].map((el) => {
				let bCls = selected === el ? 'btn-primary' : 'btn-secondary'
				return (
					<button className={`btn ${bCls}`} onClick={() => selCtg(el)}>
						{el}
					</button>
				)
			})}
		</article>
	)
}

export default CtgList
