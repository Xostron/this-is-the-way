import { useEffect, useState } from 'react'
import '../style.css'

export default function Input({ value, setValue, style, placeholder, icon, sti, type = 'text', min, max, step, cls, disabled = null, title }) {
	const [val, setVal] = useState(value)
	// Защита от сброса курсора в конец текста
	useEffect(() => {
		if (val !== value) {
			setVal(value)
		}
	}, [value, val])

	let cl = ['input', cls]
	cl = cl.join(' ')

	return (
		<input
			type={type === 'number' ? 'text' : type}
			style={sti}
			min={min}
			max={max}
			step={step}
			placeholder={placeholder}
			value={val}
			onChange={onChange}
			disabled={disabled}
			title={title}
		/>
	)

	function onChange(e) {
		let v = e.target.value
		setVal(v)
		setValue(v)
	}
}
