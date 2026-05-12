const modbus = require('jsmodbus')
const net = require('net')
const { rhr } = require('./fn.js')

function readTCP(host, port, opt) {
	return new Promise((resolve, reject) => {
		if (!host) {
			return resolve({ error: 'Не указан IP модуля', info: opt })
		}
		// if (host === '192.168.21.135') console.log(11, host, opt?.name, opt?.slaveId)
		const socket = new net.Socket()
		const cl = new modbus.client.TCP(socket, opt?.slaveId)
		const optTCP = {
			host,
			port,
		}
		socket.on('error', (e) => {
			socket.end()
			// При первом запуске неисправные модули не блокируются
			resolve({ error: e, info: opt })
		})
		socket.on('connect', (_) => {
			const p = []
			switch (opt.use) {
				case 'r':
					p.push(rhr(cl, opt.re, 'valuesAsArray', opt, 'INPUT'))
					break
				case 'w':
					p.push(rhr(cl, opt.wr, 'valuesAsArray', 'OUTPUT'))
					break
				case 'rw':
					p.push(rhr(cl, opt.re, 'valuesAsArray', opt, 'INPUT'))
					p.push(rhr(cl, opt.wr, 'valuesAsArray', opt, 'OUTPUT'))
					break
				default:
			}
			Promise.all(p)
				.then(([r, w]) => {
					resolve([r, w])
				})
				.catch((e) => {
					console.log('Ошибка чтения DO', opt.name, opt.ip)
					resolve({ error: e, info: opt })
				})
				.finally((_) => {
					socket.end()
				})
		})
		socket.connect(optTCP)
	})
}

module.exports = readTCP
