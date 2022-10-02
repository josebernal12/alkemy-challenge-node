const { DataTypes } = require('sequelize')
const db = require('../database/db')



const Personaje = db.define('Personaje', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.INTEGER
    },
    peso: {
        type: DataTypes.FLOAT
    },
    historia: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },

})


module.exports = Personaje