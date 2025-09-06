import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useInputStore from '@store/input'
import './style.css'

//Отображение сообщений: Продукт достиг температрцы задания, и т.д.
export default function Message() {
	const { build } = useParams()
	const [hid, setHid] = useState(true)
	const achieve = useInputStore((s) => s.alarm.achieve)

	useEffect(
		(_) => {
			const onClick = (e) => {
				if (e.target.closest('.act')) return
				setHid(true)
			}
			document.addEventListener('click', onClick)
			return (_) => document.removeEventListener('click', onClick)
		},
		[hid]
	)
	let arr = achieve?.[build]
	if (!arr?.length) return <></>

	// Подсветка "синим" - продукт достиг задания
	const act = arr.find((el) => el?.order === 1)
	let cl = ['cmp-subheader-mes']
	if (act) cl.push('act')
	cl = cl.join(' ')

	return (
		<div className='cmp-subheader-mes-wrapper'>
			<div className='all' hidden={hid}>
				{arr.map((el, i) => (
					<p key={i}>{el.msg}</p>
				))}
			</div>
			<div className={cl} onClick={(_) => setHid(false)}>
				<p className='text'>{arr[0]?.msg}</p>
			</div>
		</div>
	)
}
