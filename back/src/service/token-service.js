const jwt = require('jsonwebtoken')

// Генерируем новый токен
function generate(payload) {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: process.env.ACCESSS_EXPIRE,
	})
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.REFRESH_EXPIRE,
	})
	return {
		accessToken,
		refreshToken,
	}
}

/**
 * Сохраняем токен сотрудника/клиента в БД
 * @param {Object} db БД
 * @param {ObjectId} ownerId Ссылка на владельца
 * @param {String} refresh Новый рефреш токен
 * @param {String} old Старый токен
 */
function save(db, ownerId, refresh, old) {
	const o = {
		ownerId,
		refresh,
		update: new Date(),
	}
	let q
	q = { ownerId }
	if (old) q = { ownerId, refresh: old }
	db.token.update(q, { $set: o }, { upsert: true }, (err) => {
		if (err) console.error(err)
	})
}

/**
 * Удаление токена из бд
 * @param {Object} db БД
 * @param {String} refresh Рефреш токен
 * @returns
 */
function remove(db, refresh = null) {
	return new Promise((resolve, reject) => {
		if (!refresh) return resolve(true)
		// Удаление
		db.token.remove({ refresh }, (err, doc) => {
			if (err) return reject(err)
			// Не нашли
			if (!doc.ok) throw new Error('15')
			resolve(doc)
		})
	})
}

// Валидация акцесс токена
function validateAccess(token) {
	try {
		const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
		return data
	} catch (error) {
		return null
	}
}

// Валидация рефреш токена
function validateRefresh(token) {
	try {
		const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
		return data
	} catch (error) {
		return null
	}
}

// Поиск токена в БД
function findRefresh(db, token) {
	return new Promise((resolve, reject) => {
		if (!token) resolve(null)
		db.token.findOne({ refresh: token }, (err, doc) => (err ? reject(err) : resolve(doc)))
	})
}

module.exports = {
	generate,
	save,
	remove,
	validateAccess,
	validateRefresh,
	findRefresh,
}
