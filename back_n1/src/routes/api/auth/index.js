const signup = require("./signup")
// const signin = require("./signin")
// const refresh = require("./refresh")
// const logout = require("./logout")

function auth(router, db) {
    // Регистрация
	router.post("/auth/signup", signup(db))
    // Вход
	// router.post("/auth/signin", signin(db))
    // Refresh
	// router.post("/auth/signin/new_token", refresh(db))
    // Выход
	// router.get("/auth/logout", logout(db))
}

module.exports = auth
