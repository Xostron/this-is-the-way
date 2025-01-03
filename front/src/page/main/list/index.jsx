import { useCallback, useState } from "react"
import Item from "./item"

export default function List({}) {
	const [list, setList] = useState([0])
	console.log("list")
	const fnItems = useCallback((el, i) => <Item title={el} key={i} />, [list])
	return (
		<>
			<button onClick={onAdd}>Добавить</button>
			<button onClick={onDel}>Удалить</button>
			<button onClick={onInc}>+1 ко всем</button>
			{/* {list.map((el, i) => (
				<Item title={el} key={i} />
			))} */}
			{list.map(fnItems)}
		</>
	)

	function onAdd() {
		setList([...list, list.length])
	}

	function onDel() {
		setList((list) => {
			list.pop()
			return [...list]
		})
	}

	function onInc() {
		setList((list) => list.map((el) => el + 1))
	}
}
