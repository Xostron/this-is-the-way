export default function Btn({ img, name }) {
	return (
		<button>
			<img src={img} />
			{name}
		</button>
	)
}
