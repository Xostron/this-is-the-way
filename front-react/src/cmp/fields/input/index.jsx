import { useEffect, useState } from 'react'
import './style.css'

export default function Input({
	value,
	setValue,
	placeholder,
	sti,
	type = 'text',
	cls,
	disabled = null,
	title,
}) {
	const [val, setVal] = useState(value)
	// Защита от сброса курсора в конец текста
	useEffect(() => {
		if (val !== value) {
			setVal(value)
		}
	}, [value, val])

	let cl = ['cmp-fields-input', cls]
	cl = cl.join(' ')

	return (
		<div className='cmp-fields-input-text' onClick={onClick}>
			<label for='input-text' className='cmp-fields-input-label'>
				{title}
			</label>
			<input
				id='input-text'
				className={cl}
				style={sti}
				type={type === 'number' ? 'text' : type}
				placeholder={placeholder}
				value={val}
				onChange={onChange}
				disabled={disabled}
				onClick={onClickInput}
			/>
		</div>
	)

	function onChange(e) {
		let v = e.target.value
		setVal(v)
		setValue(v)
	}
	function onClickInput(e) {
		console.log(2, e.target)
	}

	function onClick(e) {
		console.log(1, e.target)
	}
}
