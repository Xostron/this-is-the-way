#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('module-alias/register')
import path from 'path'
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })
const debug = require('debug')('back-n2:server')
import app from '../app'
import http from 'http'

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT ?? '5101')
app.set('port', port)
console.log(`Сервер запущен http://localhost:${process.env.PORT}/`)
/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		// named pipe
		return val
	}

	if (port >= 0) {
		// port number
		return port
	}

	return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
	if (error.syscall !== 'listen') {
		throw error
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address()
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
	debug('Listening on ' + bind)
}
