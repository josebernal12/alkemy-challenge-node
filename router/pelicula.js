const { Router } = require('express')
const { check } = require('express-validator')
const sequelize = require('sequelize')
const Op = sequelize.Op
const {
    crearPelicula,
    listarPelicula,
    DetallePeliculas,
    actualizarPelicula,
    eliminarPelicula
} = require('../controllers/pelicula')
const { existePeliculaPorId } = require('../helpers/db-validator')
const { esAdminRole } = require('../middlewares/rol')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const Pelicula = require('../models/peliculas')

const router = Router()


router.get('/', listarPelicula)

router.get('/detalles', DetallePeliculas)
router.post('/', [
    validarJWT,
    esAdminRole,
    check('titulo', 'el titulo es obligatorio').notEmpty(),
    check('fecha', 'la fecha es obligatoria').notEmpty(),
    check('calificacion', 'la calificacion es obligatoria').notEmpty(),
    validarCampos
], crearPelicula)

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(existePeliculaPorId),
    validarCampos
],
    actualizarPelicula)


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(existePeliculaPorId),
    validarCampos
],
    eliminarPelicula)


router.get('/search', async (req, res) => {

    try {

        let pelicula;
        const { title, genre, Idmovie } = req.query

        if (title) {
            pelicula = await Pelicula.findAll({ where: { titulo: { [Op.like]: '%' + title + '%' } } })

        }
        else if (genre) {
            pelicula = await Pelicula.findAll({ where: { generoId: { [Op.like]: '%' + genre + '%' } } })

        }
        // else if (Idmovie) {
        //     pelicula = await Pelicula.findAll({ where: { peliculaId: { [Op.like]: '%' + Idmovie + '%' } } })

        // }
        else {
            return res.json('el termino no esta correcto')
        }
        res.json(pelicula)

    } catch (error) {
        res.json(error)
    }

})


module.exports = router