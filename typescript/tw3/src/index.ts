type A = { a: number; b: number }
interface B {
	x: number
	y: number
}

const AA = ({ a, b }: A): number => {
	return (a + b)*2
}

const BB = ({ x, y }: B): number => {
	return x + y
}

console.log('enter...')
console.log(AA({ a: 1, b: 2 }))
