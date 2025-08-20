// Создание задачи
function save() {
	return function (req, res) {
		const id = req.query.id
		const code = id ? 'create' : 'modify'
		res.status(200).json({ id, code })
	}
}

// Статус задачи
function get() {
	return function (req, res) {
		const id = req.query.id
		const code = 'get'
		res.json({ id, code })
	}
}
// Удаление задачи
function del() {
	return function (req, res) {
		const id = req.query.id
		const code = 'del'
		res.json({ id, code })
	}
}

module.exports = { save, get, del }
