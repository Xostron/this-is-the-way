import useEquipStore from '@store/equipment'
import useInputStore from '@store/input'
import def from '@src/tool/icon'

export default function AccelFan({ stl = {}, label = '' }) {
	const bld = useEquipStore((s) => s.build())
	const accel = useInputStore((s) => s.getFan(bld?.fan?.[0]))
	const img = def.fan?.[accel?.state]
	const state = accel?.state
	let cl = ['cmp-outdoor-value-accel']
	if (state === 'run') cl.push('a-run')
	cl = cl.join(' ')
	return (
		<article style={stl} className='cmp-outdoor-value'>
			<img className={cl} src={img} />
			<span className='cmp-outdoor-value-label cmp-outdoor-value-label-accel'>{label}</span>
		</article>
	)
}
