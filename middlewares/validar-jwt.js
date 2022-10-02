const jwt = require('jsonwebtoken')
const { config } = require('../config/config')
const Usuario = require('../models/Usuario')

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token')
    if (!token) {
        return res.status(400).json({
            msg: 'no hay token en la petición'
        })
    }
    try {

        const { id } = jwt.verify(token, config.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findByPk(id)

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }

    

       req.usuario = usuario
        next()
    } catch (error) {
        
        res.status(401).json({
            msg: 'token no valido'
        })
    }
}

module.exports = {
    validarJWT
}