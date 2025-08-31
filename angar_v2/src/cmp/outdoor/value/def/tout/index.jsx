import useInputStore from '@store/input'
import { useParams } from 'react-router-dom'
import defImg from '@src/tool/icon'
import defUn from '@src/tool/unit'
import '../../style.css'

export default function Tout({ stl = {} }) {
	const { build } = useParams()
	const tout = useInputStore((s) => s.getTotalBy('tout', 'min', build))
	// Температура улицы - мин
	const sens = { type: 'tout', ...tout }
	const imgS = defImg?.temp?.['on']
	const unit = defUn?.temp
	let cls = ['cmp-outdoor-value']
	// ошибка датчика
	if (sens.state === 'alarm') cls.push('error')
	if (sens.state === 'off') cls.push('off')
	cls = cls.join(' ')
	return (
		<article style={stl} className='cmp-outdoor-value'>
			{imgS && <img src={imgS} alt='' />}
			<span>
				{sens.value ?? '--'} {unit}
			</span>
		</article>
	)
}
