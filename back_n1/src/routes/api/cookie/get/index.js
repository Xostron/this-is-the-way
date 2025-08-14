function get(db) {
	return (req, res, next) => {
		// Читаем куки на сервере
		console.log(222, req.headers.cookie)
		// Гененрируем куки и отправляем на клиент
		res.cookie('server', 'Exodus2', {
			maxAge: 900000, // 15 минут
			httpOnly: true, // Защита от XSS (нельзя прочитать на клиенте document.cookie)
			secure: true, // true - Только HTTPS/localhost
			sameSite: 'strict', // Защита от CSRF (одинаковый домен)
		}).json({ result: 'Cookie set' })
	}
}

module.exports = get
