import Header from '@src/cmp/header'
import { Prd, PrdSel } from '@src/tool/entries'
import { FC, useState } from 'react'
import CtgList from '../ctg_list'
import PrdItem from './item'

interface Props {
	prd: Prd[]
	ctg: string[]
	selections: PrdSel[]
	add: (prd: Prd, count: number) => void
}

const PrdList: FC<Props> = (props) => {
	const { prd, ctg, selections, add } = props
	const [sel, setSel] = useState<string>('Все')
	return (
		<section>
			<Header selections={selections} />
			<div>
				<ul>
					<CtgList ctg={ctg} selCtg={setSel} selected={sel} />
				</ul>

				<ul>
					{prd.map((el) => (
						<PrdItem key={el.id} prd={el} cb={add} />
					))}
				</ul>
			</div>
		</section>
	)
}

export default PrdList
