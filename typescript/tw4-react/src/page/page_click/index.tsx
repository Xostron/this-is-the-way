import { type MouseEventHandler } from 'react'
import styles from './styles.module.css'

export default function PageClick() {
	// Function declaration с явным указанием типа
	function btnsClick(event: React.MouseEvent<HTMLButtonElement>): void {
		console.log('Кнопка нажата', event)
	}
	// Function declaration с типизированной переменной
	const mainClick: React.MouseEventHandler<HTMLDivElement> = function (event) {
		console.log('Main нажата', event)
	}
	// Стрелочная функция с явным указанием типа
	const sectClick: React.MouseEventHandler<HTMLButtonElement> = (e) =>
		console.log('sect2 нажата', e)
	// Или стрелочная функция с типизацией параметра
	const sectClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log('sect2 нажата', event)
	}
	return (
		<main className={styles.page_click_main} onClick={mainClick}>
			<section className={styles.page_click_section} onClick={btnsClick}>
				<button className={styles.page_click_btn}>🙈</button>
				<button className={styles.page_click_btn}>🙉</button>
				<button className={styles.page_click_btn}>🙊</button>
			</section>
			<section className={styles.page_click_section} onClick={sectClick}></section>
		</main>
	)
}
