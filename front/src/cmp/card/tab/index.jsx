import './style.css'

/**
 *  Вкладки карточки
 * @param {tabs} массив вкладок
 * @param {num} номер активной вкладки
 * @param {setNum} установить вкладку активной
 * @returns
 */
const Tab = ({ tabs = [], num, set }) => {
	if (!tabs.length)
		return (
			<div className='cmp-card-tab-wrap'>
				<div className={'cmp-card-tab-back'}></div>
			</div>
		)

	return (
		<div className='cmp-card-tab-wrap'>
			{tabs.length > 0 &&
				tabs.map(({ id, name }, idx) => {
					// Вкладка
					let clTab = ['cmp-card-tab-btn', idx === num ? 'active' : '']
					clTab = clTab.join(' ')
					// Подложка
					let clBack = ['cmp-card-tab-back', idx === num ? 'active' : '']
					clBack = clBack.join(' ')

					return (
						<>
							<button key={id} className={clTab} onClick={() => set(idx)}>
								{name}
								<div className={clBack}></div>
							</button>
						</>
					)
				})}
		</div>
	)
}

export default Tab
