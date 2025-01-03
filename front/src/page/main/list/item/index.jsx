import { memo, useEffect, useState } from "react"

function Item({ title }) {
    const [val, setVal] = useState(title)
    useEffect(()=>{
        setVal(title)
    },[title])
    console.log("item", title, val)
	return (
		<article>
			{val}
			<button onClick={onInc}>Увеличить</button>
		</article>
	)
	function onInc() {
		setVal(++val)
	}
}

// export default Item
export default memo(Item)
