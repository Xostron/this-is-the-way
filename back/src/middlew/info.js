const ApiError = require('@exceptions/api-error');
const { infU, infC } = require('./fn');

function info(db) {
	return function (req, res, next) {
		try {
			const user = req.info?.user ?? null;
			const company = req.info?.company ?? {};

			const a = [];
			// Инфо пользователя
			a.push(infU(db, user));
			// Инфо компании
			if (!company.code && !company.id) a.push(null);
			else {
				const q = company.code
					? { code: company.code }
					: { _id: company.id };

				a.push(infC(db, q));
			}

			Promise.all(a)
				.then(([oU, oC]) => {
					if (oU) req.info.user = { ...user, ...oU };
					if (oC) req.info.company = oC;
					next();
				})
				.catch((err) => {
					console.log('[middlewinfo.js] error: ', err);
					next(ApiError.BadRequest('Не корректно указана компания!'));
				});
		} catch (e) {
			console.log('[middlewinfo.js] error: ', e);
			next(ApiError.Unauthorized(2));
		}
	};
}

module.exports = info;
