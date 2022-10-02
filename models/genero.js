const { DataTypes } = require('sequelize')
const db = require('../database/db')

const Genero = db.define('Genero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    Nombre: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
   
})



module.exports = Genero