import { ICmp } from '@src/tool/api'
import Item from '@src/cmp/item/company'
import './style.css'

interface IProps {
	list: ICmp[] | undefined
}
function ListCompany(props: IProps) {
	return (
		<div className='cmp-list-company'>
			{!!props.list && props.list.map((el) => <Item key={el._id} data={el} />)}
		</div>
	)
}

export default ListCompany
