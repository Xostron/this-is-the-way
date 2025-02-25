module.exports = class ApiError extends Error{
    constructor(status,message,errors){
        super(message)
        this.status=status
        this.errors = errors
    }
    // Не авторизованный пользователь
	static Unauthorized(stat) {
		return new ApiError(401, 'Пользователь не авторизован. Код:' + stat);
	}
	// Не корректный запрос
	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors);
	}
	// Не корректный запрос
	static NotAcceptable(message, errors = []) {
		return new ApiError(406, message, errors);
	}
}