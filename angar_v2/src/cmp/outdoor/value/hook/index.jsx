import useInputStore from '@store/input'
import { useParams } from 'react-router-dom'
import defUn from '@src/tool/unit'

export default function useValue(key = 'tout', subkey = 'min') {
	const { build } = useParams()
	// Показание датчика и состояние (состояние - опц)
	let sens = {}
	switch (key) {
		case 'hout':
			sens = useInputStore((s) => s.getTotal('hout', 'max'))
			break
		case 'humAbs':
			sens.value = useInputStore((s) => s.input?.humAbs?.[subkey]?.[build])
			break
		case 'point':
			sens.value = useInputStore((s) => s.input?.total?.[build]?.point)
			break
		default:
			sens = useInputStore((s) => s.getTotalBy(key, subkey, build))
	}
	// Ед. измерения датчика
	const unit = fnUnit(key)

	// Ошибка датчика || (key == 'hout' && hout.state === 'alarm')
	let cls = ['cmp-outdoor-value']
	if (sens?.state === 'alarm') cls.push('error')
	if (sens?.state === 'off') cls.push('off')
	cls = cls.join(' ')

	return { value: sens?.value ?? '--', unit, cls }
}

// Ед. измерения датчика
function fnUnit(key) {
	let t
	if (['tout', 'tin', 'point', 'tprd', 'tcnl'].includes(key)) {
		t = 'temp'
	} else if (['hin', 'hout'].includes(key)) {
		t = 'mois'
	} else if ('co2' === key) {
		t = key
	} else t = 'calcMois'
	return defUn?.[t]
}
