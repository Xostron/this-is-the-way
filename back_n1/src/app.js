var path = require("path")
const cors = require("cors")
var logger = require("morgan")
var createError = require("http-errors")
var express = require("express")
var cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
var indexRouter = require("./routes/index")
const api = require("@api/index")
// const errorMiddleW = require('@middlew/error')
// const authMiddleW = require('@middlew/auth')

// Максимальный размер тела запроса
const limit = process.env?.REQ_LIMIT ?? "100mb"
//Подписывание кук
const cookie_secret = process.env?.COOKIE_SECRET ?? "*65nwyTuLuIY"

function App(db) {
	const app = express()
	app.use(express.json({ limit, inflate: true }))
	// Временная папка
	const tempFileDir = path.join(__dirname, "temp")
	// Настрока загрузки файлов
	app.use(
		fileUpload({
			createParentPath: true,
			useTempFiles: true,
			tempFileDir,
			// safeFileNames: true,
			// debug: true,
		})
	)
	// Отключение CORS
	app.use(cors({ credentials: true, origin: (origin, cb) => cb(null, true) }))

	// view engine setup
	app.set("views", path.join(__dirname, "views"))
	app.set("view engine", "pug")

	app.use(logger("dev"))
	app.use(express.urlencoded({ extended: false }))
	app.use(cookieParser(cookie_secret))
	app.use(express.static(path.join(__dirname, "public")))

	// Html page
	app.use("/", indexRouter)

	// Проверка и сбор информации о клиенте
	// app.use(authMiddleW)

	if (db) {
		// Дополнение данными из БД
		// app.use(infoMiddleW(db))

		// API
		app.use("/api", api(db))
	}
	// app.use(errorMiddleW)
	// catch 404 and forward to error handler
	app.use((req, res, next) => next(createError(404)))

	// error handler
	app.use((err, req, res, next) => {
		// set locals, only providing error in development
		res.locals.message = err.message
		res.locals.error = req.app.get("env") === "development" ? err : {}
		// render the error page
		res.status(err.status || 500)
		res.render("error")
	})
	return app
}

module.exports = App
