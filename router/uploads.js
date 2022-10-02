const { Router } = require('express')
const { ActualizarImagen } = require('../controllers/uploads')
const { check } = require('express-validator')
const { coleccionesPermitidas } = require('../helpers/db-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarArchivo } = require('../middlewares/validarArchivo')
const router = Router()

router.post('/:coleccion/:id', [
    validarArchivo,
    check('coleccion').custom(c => coleccionesPermitidas(c, ['personaje', 'pelicula'])),
    validarCampos
], ActualizarImagen)



module.exports = router