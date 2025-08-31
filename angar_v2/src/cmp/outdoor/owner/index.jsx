import useEquipStore from '@store/equipment'
import './style.css'
import Time from './time'

export default function Owner({ cls }) {
	const build = useEquipStore((s) => s.build())
	let cl = ['cmp-outdoor-owner', cls]
	cl = cl.join(' ')
	return (
		<article className={cl}>
			<Time />
			<div className='cmp-outdoor-owner-left'>
				<span className='cmp-outdoor-owner-client'>{build?.company?.name}</span>
				<span className='cmp-outdoor-owner-code'> {build?.code} </span>
			</div>
		</article>
	)
}
