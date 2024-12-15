const ApiError = require('@exceptions/api-error');
const { validateAccess } = require('@service/token-service');
const { ObjectId } = require('mongojs');

module.exports = function (req, res, next) {
	// Проверка авторизации пользователя
	try {
		const company = req.headers.company ?? null;

		req.info = {
			user: {
				auth: false,
			},
			company: {
				id: null,
				code: company,
			},
		};

		// Получаем акцесс токен из хедера
		const auth = req.headers.authorization;
		if (!auth) return next();

		// Валидируем токен
		const access = auth.split(' ')[1];
		if (!access) return next();

		const user = validateAccess(access);
		if (!user) return next();

		// Если мы из WEB то пишем информацию о компании
		if (!company && user.companyId)
			req.info.company.id = ObjectId(user.companyId);

		// Помещаем информацию о пользователе в ответ и передаем все дальше
		const o = {
			auth: true,
			id: ObjectId(user.id),
			type: user.type,
			role: user.role ?? [],
		};

		if (user.login) o.login = user.login;
		else if (user.phone) o.phone = user.phone;

		// Записываем все о пользователе
		req.info.user = o;
		next();
	} catch (e) {
		return next(ApiError.Unauthorized(1));
	}
};
