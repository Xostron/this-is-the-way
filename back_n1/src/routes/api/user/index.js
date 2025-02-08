const info = require("./info")
const isAuth = require("@middlew/is_auth")

function user(router, db) {
	router.get("/user/info", isAuth(), info(db))
}

module.exports = user
