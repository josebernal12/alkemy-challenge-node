const { Router } = require('express')
const { check } = require('express-validator')
const sequelize = require('sequelize')
const Op = sequelize.Op


const router = Router()
const {
    DetalleDelPersonaje,
    crearPersonaje,
    actualizarPersonaje,
    eliminarPersonaje,
    ListarPersonaje
} = require('../controllers/personaje')
const { existePersonajeporId } = require('../helpers/db-validator')
const { esAdminRole } = require('../middlewares/rol')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const Personaje = require('../models/personaje')


router.get('/', validarJWT, DetalleDelPersonaje)
router.get('/listar', ListarPersonaje)


router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', ' el nombre es obligatorio').not().isEmpty(),
    check('edad', 'la edad es obligatoria').notEmpty(),
    check('peso', ' el peso es obligatorio').notEmpty(),
    check('historia', ' la historia es obligatorio').notEmpty(),
    validarCampos
],
    // subirArchivo,
    crearPersonaje)
router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(existePersonajeporId),
    validarCampos
], actualizarPersonaje)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(existePersonajeporId),
    validarCampos
],
    eliminarPersonaje)



router.get('/search', async (req, res) => {

    try {

        let personaje;
        const { name, age, Idmovie } = req.query



        if (name) {
            personaje = await Personaje.findAll({ where: { nombre: { [Op.like]: '%' + name + '%' } } })

        }
        else if (age) {
            personaje = await Personaje.findAll({ where: { edad: { [Op.like]: '%' + age + '%' } } })

        }
        else if (Idmovie) {
            personaje = await Personaje.findAll({ where: { peliculaId: { [Op.like]: '%' + Idmovie + '%' } } })

        }
        else {
            return res.json('el termino no esta correcto')
        }
        res.json(personaje)

    } catch (error) {
        res.json(error)
    }

})




module.exports = router