const bcrypt = require('bcrypt');

// Формирование нового пароля
function pwd(password) {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, 3, (err, hash) => {
			if (!hash) return reject(err ?? 'Обратитесь к администратору!');
			resolve(hash);
		});
	});
}

module.exports = { pwd };
