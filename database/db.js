const { Sequelize } = require('sequelize')
const { config } = require('../config/config')


const db = new Sequelize(config.DB, config.DB_USER, config.DB_PASS ?? '', {
    host: config.DB_HOST,
    dialect: 'mysql',
    // logging: false
})

module.exports = db