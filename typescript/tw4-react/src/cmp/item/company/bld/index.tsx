import { IBld } from '@src/tool/api'

interface IProps {
	data: IBld
}

export default function ItemBld(props: IProps) {
	const { code, on, sectionCount, type, _id } = props.data
	if (_id == '66c73ed6320b24af61331171') console.log(222, props.data)
	return (
		<article className='cmp-item-company-bld back-img-type-bld' data-img={type} title={_id}>
			{/* <img src={`/img/type/${type}.svg`} alt='type' /> */}
			{code}
		</article>
	)
}
