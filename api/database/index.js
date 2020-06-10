const Sequelize = require('Sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,

    timezone: 'America/Denver',

    pool: {
        max: parseInt(process.env.DB_POOL_MAX, 10),
        min: parseInt(process.env.DB_POOL_MIN, 10),
        acquire: process.env.DB_POOL_ACQUIRE,
        idle: process.env.DB_POOL_IDLE
    }
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
