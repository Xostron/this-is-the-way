import { IBld } from '@src/tool/api'

interface IProps {
	data: IBld
}

export default function ItemBld(props: IProps) {
	const { code, on, sectionCount, type, _id } = props.data
	console.log(222, props.data)
	return (
		<article className='cmp-item-company-bld'>
			<img src={`/img/type/${type}.svg`} alt='type' />
		</article>
	)
}
