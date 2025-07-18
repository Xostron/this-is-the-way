import { IListPc } from '@api/company/type'
import ItemBld from '../bld'
interface IProps {
	data: IListPc
}

export default function ItemPC(props: IProps) {
	const { data, header, order } = props.data
	return (
		<article className='cmp-item-company-pc'>
			<span>{header.ip}</span>
			<div className='cmp-item-company-content cmp-item-company-pc-content '>
				{data && data.map(el=><ItemBld key={el._id} data={el}/>)}
			</div>
		</article>
	)
}
