const p1 = [foo(10, 2), Promise.resolve(1), Promise.resolve(2)]
const p2 = [Promise.reject(3), Promise.resolve(4)]
const p3 = [Promise.reject(5), Promise.reject(6)]
function foo(x, y) {
	return x + y
}

async function asyncResolver(promises) {
	const err = []
	for (const p of promises) {
		try {
			const r = await p
			return r
		} catch (error) {
			err.push(error)
		}
	}
	throw new Error(err)
}

asyncResolver(p1).then(console.log)
asyncResolver(p2).then(console.log)
asyncResolver(p3).catch(console.log)


