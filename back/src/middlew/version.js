const ApiError = require('@exceptions/api-error');
const { getV } = require('./fn');

/**
 * Провверка версии клиентского приложения
 * @returns
 */
function version() {
	return function (req, res, next) {
		// Время последнего изменения файла;
		const data = getV();
		// Проверка авторизации пользователя
		try {
			const version = req.headers?.version ?? '<no version>';
			const name = req.headers?.name ?? '<no name>';
			const company = req.headers?.company ?? '<no company>';
			// !!! Доступ для всех
			// if (!version || !name) return next();

			const info = ` <${
				req.info?.user?.phone ?? 'noAuth'
			}>: ${company} - ${name} - ${version}`;

			//Полный доступ для EXPO на Android & iOS
			if (name.toLowerCase().includes('host.exp.exponent')) return next();

			if (!version)
				return next(ApiError.Unsupported('Не передана версия!' + info));

			v = data.find((el) => el.id.includes(name));

			// // !!! Доступ для всех
			// // if (!v) return next();
			if (!v)
				return next(
					ApiError.Unsupported('Нет доступных версиий!' + info)
				);

			if (v.ok.includes(version) || v.part.includes(version))
				return next();

			return next(ApiError.Unsupported('Нет в списках!' + info));
		} catch (e) {
			console.error(e);
			return next(ApiError.Unsupported('Ошибка: ' + e.toString()));
		}
	};
}
module.exports = version;
