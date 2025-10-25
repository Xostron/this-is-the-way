import { IBld } from '@api/company/type'

interface IProps {
	data: IBld
}

export default function ItemBld(props: IProps) {
	const { code, on, sectionCount, type, _id } = props.data
	return (
		<article className='cmp-item-company-bld' title={_id}>
			<div
				className='cmp-item-company-bld-content back-img-type-bld'
				data-alarm={2}
				data-img={type}
			></div>
			{code}
		</article>
	)
}
