import { ICmp } from '@api/company/type'
import Item from '@src/cmp/item/company'
import './style.css'

interface IProps {
	list: ICmp[] | undefined | boolean
}
function ListCompany(props: IProps) {
	return (
		<>
			<h1>Список клиентов</h1>
			{props.list ? '123 true' : '123 null'}
			{/* <div className='cmp-list-company'>{!!props.list && props.list.map((el) => <Item key={el._id} data={el} />)}</div> */}
		</>
	)
}

export default ListCompany
