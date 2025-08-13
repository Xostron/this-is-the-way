import { useEffect, useRef, type MouseEventHandler } from 'react'
import styles from './styles.module.css'

export default function PageClick() {
	// Событие перехватывается на всплытии (обработчик onClick)
	// Function declaration с явным указанием типа
	function btnsClick(event: React.MouseEvent<HTMLButtonElement>): void {
		console.log('Кнопка нажата', event.target, event.currentTarget)
	}
	// Function declaration с типизированной переменной
	const mainClick: React.MouseEventHandler<HTMLDivElement> = function (event) {
		console.log('Main нажата', event.target, event.currentTarget)
	}
	// Стрелочная функция с явным указанием типа
	const sectClick: React.MouseEventHandler<HTMLButtonElement> = (event) =>
		console.log('sect2 нажата', event.target, event.currentTarget)
	// Или стрелочная функция с типизацией параметра
	const btnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log('btn нажата', event.target, event.currentTarget)
	}

	// Перехват: событие перехватывается сверху вних
	function cbClick(event: MouseEvent): void {
		console.log('Нажата', event.target, event.currentTarget)
	}
	const id1Ref = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		const id1 = id1Ref.current
		const id2 = document.querySelector<HTMLDivElement>('#id2')
		const id3 = document.querySelector<HTMLButtonElement>('#id3')
		// Проверка на null перед использованием addEventListener
		id1?.addEventListener('click', cbClick, true)
		id2?.addEventListener('click', cbClick, true)
		id3?.addEventListener('click', cbClick, true)
		return () => {
			id1?.removeEventListener('click', cbClick)
			id2?.removeEventListener('click', cbClick)
			id3?.removeEventListener('click', cbClick)
			console.log('clean up btnClick')
		}
	}, [])

	return (
		<main className={styles.page_click_main} onClick={mainClick}>
			<section className={styles.page_click_section} onClick={btnsClick}>
				<button className={styles.page_click_btn} onClick={btnClick}>
					🙈
				</button>
				<button className={styles.page_click_btn}>🙉</button>
				<button className={styles.page_click_btn}>🙊</button>
			</section>

			<section id='id1' ref={id1Ref} className={styles.page_click_section}>
				<article id='id2' className={styles.page_click_section}>
					<button id='id3' className={styles.page_click_btn}>
						Перехват
					</button>
				</article>
			</section>
		</main>
	)
}
