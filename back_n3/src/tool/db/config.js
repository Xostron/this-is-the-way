const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PSW, {
	host: process.env.DB_DOMEN,
	port: process.env.DB_PORT,
	dialect:'postgres',
})

module.exports = { db }
