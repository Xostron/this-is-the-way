function delay(ms: number) {
	return new Promise((resolve, reject) => {
		if (ms <= 0) return resolve(null)
		console.log(11, 'delay', new Date())
		setTimeout(() => {
			console.log(22, 'delay', new Date())
			return resolve(true)
		}, ms)
	})
}
export default delay
