import sum from './index'

test('src\\tool\\index.ts', () => {
	let r = sum(12, 12)
	expect(r).toBe(144)
})
