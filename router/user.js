const { Router } = require('express')
const { check } = require('express-validator')

const {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuarios,
    ActualizarUsuario,
    EliminarUsuario
} = require('../controllers/user')
const { existeUsuarioPorId, emailValido } = require('../helpers/db-validator')
const { esAdminRole } = require('../middlewares/rol')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()


router.get('/', obtenerUsuarios)
router.get('/:id', [
    check('id').custom(existeUsuarioPorId),
    validarCampos
], obtenerUsuarioPorId)
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('telefono', 'el telefono es obligatorio').not().isEmpty(),
    check('email').custom(emailValido),
    validarCampos
],
    crearUsuarios)
router.put('/:id', [
    validarJWT,
    check('id').custom(existeUsuarioPorId),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').not().isEmpty(),
    // check('email', 'el email no es de tipo email').not().isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('telefono', 'el telefono es obligatorio').not().isEmpty(),
    validarCampos
], ActualizarUsuario)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(existeUsuarioPorId),
    validarCampos
], EliminarUsuario)


module.exports = router