const reserve = require("./reserve")


function booking(router) {
    // Регистрация
	router.post("/booking/reserve", reserve())

}

module.exports = booking
