const { tariff } = require('@tool/company');
const { findOne, find } = require('@tool/db');
const fs = require('fs');
const path = require('path');

// Дополнение info данными компании
function infC(db, q, short = false) {
	return new Promise((resolve, reject) => {
		let c;
		findOne(db, 'company', q)
			.then((r) => {
				if (!r) return Promise.resolve([]);
				c = {
					id: r._id,
					code: r.code,
					name: r.name,
					bonus: r.bonus,
					delivery: r.delivery ?? {},
					courier: r.courier ?? {},
					review: r.review ?? {},
					friend: r.friend ?? {},
					trade: r.trade ?? {},
					ic: { on: r.ic?.on ?? false },
				};

				const a = [];
				if (!short) {
					// Получение тарифа компании и интервалов доставки
					a.push(tariff(db, r._id));
					a.push(find(db, 'dlvTime', { companyId: r._id }));
				}

				return Promise.all(a);
			})
			.then(([t, d]) => {
				if (t) c.tariff = t;
				if (d) c.dlvTime = d;
				resolve(c);
			})
			.catch(reject);
	});
}

// Дополнение info данными пользователя
function infU(db, user) {
	return new Promise((resolve, reject) => {
		if (!user && !user.id) return resolve(null);

		switch (user.type) {
			case 'client':
				findOne(db, 'cliInfo', { clientId: user.id })
					.then((r) => resolve({ cliInfoId: r._id }))
					.catch(reject);
				break;
			default:
				Promise.all([emp(db, user), town(db, user)])
					.then(([obj, code]) => {
						if (obj) obj.town = code;
						resolve(obj);
					})
					.catch(reject);
				break;
		}
	});
}

/**
 * Настройки пользователя для web
 * @param {Object} db БД
 * @param {Object} user Документ пользователя
 * @returns
 */
function emp(db, user) {
	return new Promise((resolve, reject) => {
		findOne(db, 'employee', { _id: user.id })
			.then((doc) => {
				if (!doc) return resolve(null);
				const l_def = {
					form: +process.env.L_FORM,
					table: +process.env.L_TABLE,
				};
				const o = {
					line: doc.line ?? l_def,
					short: doc.short ?? false,
				};
				resolve(o);
			})
			.catch(reject);
	});
}

function town(db, user) {
	return new Promise((resolve, reject) => {
		let a = [];
		const q = { 'owner.id': user.id };
		const cur = db.town.find(q).sort({ code: 1 });
		cur.on('error', (error) => reject(error));
		cur.on('data', (doc) => {
			if (doc.code === 'all') {
				a = 'all';
				cur.destroy();
				return resolve(a);
			}
			a.push(doc.code);
		});
		cur.on('end', (_) => resolve(a));
	});
}

/**
 * Чтение файла при первом обращении или изменении
 */
const getV = ((_) => {
	let data = null;
	let time = null;
	return (_) => {
		const file = path.join(__dirname, '..', 'version.json');
		const t = fs.statSync(file).mtime.toString();
		if (data && t == time) return data;

		data = fs.readFileSync(file, 'utf8');
		data = JSON.parse(data) ?? [];
		time = t;
		return data;
	};
})();

module.exports = { infU, infC, getV };
