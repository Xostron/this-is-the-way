import style from './styles.module.css'
import { JSX } from 'react'

interface IBtnProps {
	label?: string | number | undefined | null
	cls?: string
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset' // Тип кнопки
	children?: React.ReactNode // Поддержка дочерних элементов
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
	gradient?: boolean
	nav?: boolean
}

export default function Btn({
	label,
	onClick,
	disabled = false,
	cls = '',
	children,
	gradient,
	nav,
}: IBtnProps): JSX.Element {
	let className = `${style.cmp_fields_btn} ${cls}`
	if (gradient) className += ' ' + style.cmp_fields_btn_gradient
	if (nav) className += ' ' + style.cmp_fields_btn_nav

	return (
		<button onClick={onClick} disabled={disabled} className={className}>
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
