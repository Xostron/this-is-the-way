var createError = require('http-errors')
var express = require('express')
var path = require('path')
const cors = require('cors')
var cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
var indexRouter = require('./routes/index')
const api = require('@routes/api')

// Максимальный размер тела запроса
const limit = process.env?.REQ_LIMIT ?? '100mb'
// Временная папка
const tempFileDir = path.join(__dirname, 'temp')

var app = express()

app.use(
	cors({
		allowedHeaders: ['content-type', 'set-cookie', 'authorization', 'user-agent'],
		credentials: true, // Разрешить отправку куки
		origin: (origin, cb) => {
			const allowed = ['http://localhost:5001']
			// Разрешить в режиме разработки, мобильных приложений и списку вэб клиентов
			if (process.env.NODE_ENV === 'development' || !origin || allowed.indexOf(origin)) return cb(null, true)
			return cb(new Error('Нет доступа (CORS)'))
		},
	})
)
// Настрока загрузки файлов
app.use(
	fileUpload({
		createParentPath: true,
		useTempFiles: true,
		tempFileDir,
		// safeFileNames: true,
	})
)
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.json({ limit, inflate: true }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Html page
app.use('/', indexRouter)

// API
app.use('/api', api())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
