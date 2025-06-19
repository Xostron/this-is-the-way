import { ICmp } from '@src/tool/api'
import ItemPC from './pc'
import './style.css'


interface IProps {
	data: ICmp
}

export default function Item(props: IProps) {
	const { _id, name, code, pc } = props.data
	return (
		<article className='cmp-item-company'>
			{name}
			<div className='cmp-item-company-content'>
				{pc.map((el) => (
					<ItemPC key={el.header._id} data={el}  />
				))}
			</div>
		</article>
	)
}
