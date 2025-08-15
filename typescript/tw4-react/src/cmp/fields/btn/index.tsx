import style from './styles.module.css'

interface IBtnProps {
	label?: string | number | undefined | null
	cls?: string
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset' // Тип кнопки
	children?: React.ReactNode // Поддержка дочерних элементов
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
}

export default function Btn({ label, onClick, disabled = false, cls = '', children }: IBtnProps) {
	return (
		<button onClick={onClick} disabled={disabled} className={`${style.cmp_fields_btn} ${cls}`}>
			{label}
			{children}
		</button>
	)
}

// Пример объявления стрелочной функции
/*
const Button: React.FC<IBtnProps> = ({ label, onClick }) => {
	return <button onClick={onClick}>{label}</button>
}
*/
