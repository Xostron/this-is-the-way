import useEquipStore from '@store/equipment'
import Time from './time'
import './style.css'

export default function Owner({ stl }) {
	const build = useEquipStore((s) => s.build())
	return (
		<article style={stl} className='cmp-outdoor-owner'>
			<Time />
			<div className='cmp-outdoor-owner-left'>
				<span className='cmp-outdoor-owner-client'>{build?.company?.name}</span>
				<span className='cmp-outdoor-owner-code'> {build?.code} </span>
			</div>
		</article>
	)
}
