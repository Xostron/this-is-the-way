const { generate, save } = require('./fn')
const { v4: uuidv4 } = require('uuid');

/**
 * Создание и сохранение токенов
 * @param {Object} db ссылка на БД
 * @param {Object} user Данные о пользователе
 * @param {Object} req 
 * @param {Object} res
 * @returns {Promise} данные о токенах и пользователе
 */
async function refreshAndSave(db, user, req, res) {
    // Id устройства привязан к рефреш токену
    const deviceId = uuidv4()
	const doc = { login: user.login, _id: user._id, on: user.on, deviceId }
	// Генерация новой пары токенов на основе doc
	const tokens = generate(doc)
	// Сохранение рефреш токена пользователя в БД
	await save(db, doc._id, tokens.refreshToken)
	// Добавляем рефреш токен в куки
	res.cookie('refreshToken', tokens.refreshToken, {
		maxAge: 1 * 60 * 1000, //30 мин
		httpOnly: true,
		secure:true,
		sameSite:'strict'
	})
	return { ...tokens, user: doc }
}

module.exports = refreshAndSave
