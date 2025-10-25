// Создание задачи
function save(db) {
	return function (req, res) {
		const id = req.query.id
		const data = req.body
		const code = id ? 'create' : 'modify'
		
		res.status(200).json({ id, code })
	}
}

// Статус задачи
function get(db) {
	return function (req, res) {
		const id = req.query.id
		const code = 'get'
		res.json({ id, code })
	}
}
// Удаление задачи
function del(db) {
	return function (req, res) {
		const id = req.query.id
		const code = 'del'
		res.json({ id, code })
	}
}

module.exports = { save, get, del }
