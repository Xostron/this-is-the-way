const { generate, save } = require('@tool/auth/token/fn')

/**
 * Создание и сохранение токенов
 * @param {*} db
 * @param {*} user Данные о пользователе
 * @param {*} res
 */
async function refreshAndSave(db, user, res) {
	const doc = { login: user.login, id: user._id, on: user.on }
	// Новый токен
	const tokens = generate(doc)
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
