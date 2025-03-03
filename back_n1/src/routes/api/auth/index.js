const signup = require("./signup")
const signin = require("./signin")
const refresh = require("./refresh")
const logout = require("./logout")

function auth(router, db) {
    // Регистрация
	router.post("/auth/signup", signup(db))
    // Вход
	router.post("/auth/signin", signin(db))
    // Refresh
	router.get("/auth/refresh", refresh(db))
    // Выход
	router.post("/auth/logout", logout(db))
}

module.exports = auth
