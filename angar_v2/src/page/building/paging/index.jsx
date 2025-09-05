import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useEquipStore from '@store/equipment'
import Btn from '@cmp/fields/btn'
import Item from './item'
import './style.css'
// Максимальное количество секций
const max = 4

// Пейджинг секций
export default function Paging({ bId }) {
	let { build } = useParams()
	const navigate = useNavigate()
	const location = useLocation()
	const bld = useEquipStore((s) => s.getCurB(build))
	const setCurB = useEquipStore((s) => s.setCurB)
	const sects = useEquipStore((s) => s.sections()) ?? []
	const [arr, setArr] = useState(sects?.slice(0, max))
	const [page, setPage] = useState(0)

	// Обновление страницы - для подтягивания секций текущего склада
	useEffect(() => {
		setCurB(bld)
	}, [bld])

	// Листание страниц
	useEffect(() => {
		const start = page * max
		const end = start + max
		setArr(sects?.slice(start, end))
	}, [page, sects])

	// Редирект на секцию (Нет секций или секций = 1)
	useEffect(() => {
		if (sects?.length > 1 || sects?.length === 0 || sects?.[0]?.buildingId != build) return
		const path = `${location.pathname}/section/${sects?.[0]?._id}`.replace('//', '/')
		navigate(path)
	}, [sects])

	// Нет секций или секций
	if (!sects || sects?.length < 2) return

	let cl = ['page-building-paging-item', `pcx${arr.length}`]
	cl = cl.join(' ')
	return (
		<section className='page-building-paging'>
			<article className={cl}>{arr?.length && arr.map((el, i) => <Item key={i} cls={arr?.length} sec={el} bId={bId} iSect={i} />)}</article>
			<Leaf sects={sects} page={page} setPage={setPage} />
		</section>
	)
}

// Кнопки пролистывания
function Leaf({ sects, page, setPage }) {
	const limit = Math.ceil(sects?.length / max) -1
	if (!limit) return
	return (
		<div className='page-building-paging-arrow'>
			{limit >= 1 && <Btn icon='\img\arrow-left.svg' cls='paging-arrow' onClick={prev} />}
			{limit >= 1 && <Btn icon='\img\arrow-right.svg' cls='paging-arrow' onClick={next} />}
		</div>
	)
	// Следующая страница
	function next() {
		if (page >= limit) return setPage((pr) => (pr = 0))
		setPage((pr) => ++pr)
	}
	// Предыдущая страница
	function prev() {
		if (page <= 0) return setPage((pr) => (pr = limit))
		setPage((pr) => --pr)
	}
}
