type A = { a: number; b: number }
interface B {
	x: number
	y: number
}

const AA = ({ a, b }: A): number => {
	return a + b
}

const BB = ({ x, y }: B): number => {
	return x + y
}
