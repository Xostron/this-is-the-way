require('module-alias/register')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const App = require('@root/app')
const mongojs = require('mongojs')
require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') })


// Подключение к mongo
const db = mongojs(process.env.BD_URI)
db.on('error', (err) => console.log('Отсутствует связь с MongoDB'))
db.on('connect', () => console.log('Связь с MongoDB установлена'))

// Порт
var port = normalizePort(process.env.PORT || '4101')
const app = App(db)
app.set('port', port)


// Create HTTP server.
const server = http.createServer(app)

// Create websocket server
const io = new Server(server, {
	cors: process.env.ALLOWED_ORIGIN,
	serveClient: false,
})


module.exports = { server, io }


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}