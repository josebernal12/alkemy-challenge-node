const Pelicula = require("../models/peliculas")
const Personaje = require("../models/personaje")
const Usuario = require("../models/Usuario")


const emailValido = async (email = '') => {
    const existeEmail = await Usuario.findOne({ where: { email } })

    if (existeEmail) {
        throw new Error(`el email ${email} ya esta registrado`)
    }

}

const existeUsuarioPorId = async (id) => {

    const existeUsuario = await Usuario.findByPk(id)

    if (!existeUsuario) {
        throw new Error(`el usuario con el id ${id} no existe`)
    }
}
const existePersonajeporId = async (id) => {

    const existePersonaje = await Personaje.findByPk(id)

    if (!existePersonaje) {
        throw new Error(`el personaje con el id ${id} no existe`)
    }
}
const existePeliculaPorId = async (id) => {

    const existePelicula = await Pelicula.findByPk(id)

    if (!existePelicula) {
        throw new Error(`la pelicula con el id ${id} no existe`)
    }
}
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion)

    if (!incluida) {
        throw new Error(`la coleccion ${coleccion} no es permitida - ${colecciones}`)
    }
    return true
}




module.exports = {
    emailValido,
    existeUsuarioPorId,
    existePersonajeporId,
    existePeliculaPorId,
    coleccionesPermitidas

}