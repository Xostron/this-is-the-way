import './style.css'

/**
 *  Вкладки карточки
 * @param {tabs} массив вкладок
 * @param {num} номер активной вкладки
 * @param {setNum} установить вкладку активной
 * @returns
 */
const Tab = ({ tabs = [], num, set }) => {
	// задний фон вкладок карточки
	const back = tabs.length > 1 ? 'cmp-card-tab-back' : `cmp-card-tab-back active`
	return (
		<div className='cmp-card-tab-wrap'>
			<div className={back}></div>
			{tabs.length > 1 &&
				tabs.map(({ id, name }, idx) => (
					<button key={id} className={['cmp-card-tab-main', idx === num ? 'active' : ''].join(' ')} onClick={() => set(idx)}>
						{name}
					</button>
				))}
		</div>
	)
}

export default Tab
