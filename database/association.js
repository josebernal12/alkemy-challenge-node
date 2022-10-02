const personaje = require('../models/personaje')
const pelicula = require('../models/peliculas')
const usuarios = require('../models/Usuario')
const Genero = require('../models/genero')

personaje.hasMany(pelicula, {
    foreignKey: 'personajeId',
    sourceKey: 'id'
})

pelicula.hasMany(personaje, {
    foreignKey: 'peliculaId',
    sourceKey: 'id'
})
pelicula.hasMany(Genero, {
    foreignKey: 'peliculaId',
    sourceKey: 'id'
})

Genero.hasMany(pelicula, {
    foreignKey: 'generoId',
    sourceKey: 'id'
})