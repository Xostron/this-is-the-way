const { ObjectId } = require('mongojs')

/**
 * Вернет весь документ по ключевому полю
 * @param {Object} db БД
 * @param {String} collection Наименование Коллекции
 * @param {String} val Значение для поиска
 * @param {*} key Ключ по которому искать
 * @returns
 */
function dict(db, collection, val, key = 'code') {
	return new Promise((resolve, reject) => {
		if (!collection || !val) return resolve(null)
		if (key === '_id') val = ObjectId(val)
		const q = {}
		q[key] = val
		db[collection].findOne(q, (error, doc) => {
			if (error) reject(error)
			resolve(doc)
		})
	})
}

function dicts(db, collection, q = {}, struct = {}) {
	return new Promise((resolve, reject) => {
		if (!collection) return resolve(null)
		db[collection].find(q, struct, (err, docs) => {
			if (err) reject(err)
			resolve(docs)
		})
	})
}

function sImg(docs) {
	const obj = {}
	docs.forEach((el) => {
		obj[el.fld?.name] = el.name
	})
	return obj
}

module.exports = { dict, dicts, sImg }
