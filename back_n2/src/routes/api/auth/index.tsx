import express from 'express'

function auth(router){
        // Регистрация
	router.post("/auth/signup", signup(db))
    // Вход
	router.post("/auth/signin", signin(db))
    // Refresh
	router.get("/auth/refresh", refresh(db))
    // Выход
	router.post("/auth/logout", logout(db))
}