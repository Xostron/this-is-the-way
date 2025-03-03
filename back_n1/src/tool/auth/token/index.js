const { generate, save } = require('./fn')
const { v4: uuidv4 } = require('uuid');

/**
 * Создание и сохранение токенов
 * @param {*} db
 * @param {*} user Данные о пользователе
 * @param {*} res
 */
async function refreshAndSave(db, user, req, res) {
    // Id устройства привязан к рефреш токену
    const deviceId = uuidv4()
	const doc = { login: user.login, _id: user._id, on: user.on, deviceId }
	// Новый токен на основе doc
	const tokens = generate(doc)
	console.log(111, deviceId)
	// Сохранение рефреш токена
	await save(db, doc._id, tokens.refreshToken)

	// Добавляем рефреш токен в куки
	res.cookie('refreshToken', tokens.refreshToken, {
		maxAge: 30 * 60 * 1000, //30 мин
		httpOnly: true,
	})
	return { ...tokens, user: doc }
}

module.exports = refreshAndSave
