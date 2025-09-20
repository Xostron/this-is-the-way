export default function Btn({ label, type = 'button', click }) {
	return (
		<button type={type} onClick={click}>
			{label}
		</button>
	)
}
