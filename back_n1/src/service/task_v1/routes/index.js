const { save, get, del } = require('./fn')

function taskV1(router, db) {
	// Статус задачи
	router.get('/task/v1', get(db))
	// Создать/Редактировать задачу
	router.post('/task/v1', save(db))
	// Удалить задачу
	router.delete('/task/v1', del(db))
}

module.exports = taskV1
