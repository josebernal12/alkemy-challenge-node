const { DataTypes } = require('sequelize')
const db = require('../database/db')

const Pelicula = db.define('Pelicula', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    titulo: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.DATE
    },
    calificacion: {
        type: DataTypes.FLOAT
    },
    img: {
        type: DataTypes.STRING
    },


})



module.exports = Pelicula