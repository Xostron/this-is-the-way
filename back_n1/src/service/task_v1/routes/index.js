const { save, get, del } = require('./fn')

function taskV1(router, db) {
	router
		.route('/task/v1')
		// Статус одной/более задач
		.get(get(db))
		// Создать новую/Редактировать существующую задачу
		.post(save(db))
		// Удалить задачу
		.delete(del(db))
}

module.exports = taskV1
