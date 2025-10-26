const { DataTypes } = require('sequelize')
const sequelize = require('../config')

const Event = sequelize.define(
	'Event',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		total_seats: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
			},
		},
	},
	{
		tableName: 'events',
		timestamps: false,
	}
)

Event.hasMany(Booking, { foreignKey: 'event_id' })

module.exports = Event
