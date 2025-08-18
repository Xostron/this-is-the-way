module.exports = class ApiError extends Error {
	constructor(status, message, errors) {
		super(message)
		this.status = status
		this.errors = errors
	}
	// Не корректный запрос
	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors)
	}
	// Не авторизованный пользователь
	static Unauthorized(stat) {
		return new ApiError(401, 'Пользователь не авторизован. Код:' + stat)
	}
	// Доступ запрещен
	static Forbidden(message, errors = []) {
		return new ApiError(403, message, errors)
	}
	// Ресурс не найден
	static NotFound(message, errors = []) {
		return new ApiError(404, message, errors)
	}
	// Внутрення ошибка сервера
	static InternalServerErr(message, errors = []) {
		return new ApiError(500, message, errors)
	}
}
