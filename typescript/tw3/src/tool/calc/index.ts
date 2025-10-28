// | - объединение типов

function calcu(a: number, format: boolean): string | number {
	const v = a * 4.2
	const xx:object[] = []
	return format ? `$${v.toFixed(2)}` : v
}

export { calcu }
