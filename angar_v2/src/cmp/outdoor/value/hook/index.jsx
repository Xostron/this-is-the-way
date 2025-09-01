import useInputStore from '@store/input'
import { useParams } from 'react-router-dom'
import defUn from '@src/tool/unit'

export default function useValue(key = 'tout', subkey = 'min') {
	const { build } = useParams()
	const { state, value } = useInputStore((s) => s.getTotalBy(key, subkey, build))
	const humAbs = useInputStore((s) => s.input?.humAbs?.[subkey]?.[build])
	const hout = useInputStore((s) => s.getTotal('hout', 'max'))
	const point = useInputStore((s) => s.input?.total?.[build]?.point)
	// Ед. измерения датчика
	let t
	if (['tout', 'tin', 'point'].includes(key)) {
		t = 'temp'
	} else if (['hin', 'hout'].includes(key)) {
		t = 'mois'
	} else if ('co2' === key) {
		t = key
	} else t = 'calcMois'
	const unit = defUn?.[t]

	// Ошибка датчика
	let cls = ['cmp-outdoor-value']
	if (state === 'alarm') cls.push('error')
	if (state === 'off') cls.push('off')
	cls = cls.join(' ')
	switch (key) {
		case 'calcMois':
			return { value: humAbs ?? '--', unit, cls }
		case 'hout':
			return { value: hout.value ?? '--', unit, cls }
		case 'point':
			return { value: point ?? '--', unit, cls }
		default:
			return { value: value ?? '--', unit, cls }
	}
}
