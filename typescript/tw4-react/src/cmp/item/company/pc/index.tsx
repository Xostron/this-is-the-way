import { IListPc } from '@src/tool/api'

interface IProps {
	data: IListPc
}

export default function ItemPC(props: IProps) {
	const { data, header, order } = props.data
	return (
		<article className='cmp-item-company-content cmp-item-company-pc'>
			{header.ip}
			<div className='cmp-item-company-pc-content '>
asd
			</div>
		</article>
	)
}
