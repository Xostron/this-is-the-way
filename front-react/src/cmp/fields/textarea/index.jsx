import './style.css'

function TextArea({
	placeholder,
	rows = 5,
	cols = 50,
	maxlength,
	minlength,
	wrap = 'soft',
	resize = 'none',
	title,
	value,
	setValue,
	cls,
}) {
	let cl = ['cmp-fields-textarea-wrapper', cls]
	cl = cl.join(' ')
	return (
		<label className={cl}>
			{title}
			<textarea
				data-resize={resize}
				className='cmp-fields-textarea'
				placeholder={placeholder}
				rows={rows}
				cols={cols}
				maxlength={maxlength}
				minlength={minlength}
				wrap={wrap}
				onChange={onChange}
			>
				{value}
			</textarea>
		</label>
	)
	function onChange(e) {
		console.log(1, e.target.value)
		if (!setValue) return
		setValue(e.target.value)
	}
}

export default TextArea
