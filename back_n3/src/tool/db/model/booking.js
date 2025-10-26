const { DataTypes } = require('sequelize')
const sequelize = require('../config')

const Booking = sequelize.define(
	'Booking',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		event_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'events',
				key: 'id',
			},
		},
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: 'bookings',
		timestamps: false,
	}
)
Booking.belongsTo(Event, { foreignKey: 'event_id' })
// Уникальный индекс: один пользователь — одно бронирование на событие
Booking.addHook('afterSync', async () => {
	await sequelize.getQueryInterface().addIndex('bookings', {
		fields: ['event_id', 'user_id'],
		unique: true,
		name: 'unique_booking_per_user_event',
	})
})

module.exports = Booking
