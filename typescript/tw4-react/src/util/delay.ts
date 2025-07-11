// function delay(ms: number) {
// 	if (!ms) return Promise.resolve()
// 	console.log(11, 'delay', new Date())
// 	setTimeout(() => {
// 		console.log(22, 'delay', new Date())
// 		return Promise.resolve()
// 	}, ms)
// }

function delay(ms: number) {
	return new Promise((resolve, reject) => {
		if (ms <= 0) return resolve(true)
		console.log(11, 'delay', new Date())
		setTimeout(() => {
			console.log(22, 'delay', new Date())
			return resolve(true)
		}, ms)
	})
}
export default delay
