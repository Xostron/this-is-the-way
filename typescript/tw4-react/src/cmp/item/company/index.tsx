import { ICmp } from '@src/tool/api'
import './style.css'
// export default function Item({ data }: { data: IFetchCmp }) {
// 	const { _id, name, code, pc } = data
// }

interface IProps {
	data: ICmp
}

export default function Item(props: IProps) {
	const { _id, name, code, pc } = props.data
	return (
		<article className='cmp-item-company'>
			{name}
			<div className='cmp-item-company-content'>
				asdas
			</div>
		</article>
	)
}
