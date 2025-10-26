const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PSW, {
	host: process.env.DOMEN,
	port: process.env.PORT,
	dialect:'postgres',
})

module.exports = { db }
