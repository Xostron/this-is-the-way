function info(db) {
	return (req, res, next) => {
		res.json({ message: "info user" })
	}
}

module.exports = info
