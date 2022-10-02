const fs = require('fs')
const path = require('path')

const { subirArchivo } = require('../helpers/subirArchivo');
const Personaje = require('../models/personaje');
const Pelicula = require('../models/peliculas');


const cargarArchivo = async (req, res) => {

    try {
        const nombre = await subirArchivo(req.files)

        res.json({
            nombre

        })
    } catch (msg) {
        res.status(400).json({ msg })
    }
}


const ActualizarImagen = async (req, res) => {


    const { id, coleccion } = req.params

    let modelo;

    switch (coleccion) {
        case 'personaje':
            modelo = await Personaje.findByPk(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe el personaje con el id ${id}`
                })
            }
            break
        case 'pelicula':
            modelo = await Pelicula.findByPk(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe la pelicula con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: 'se me olvido validar esto'
            });
    }

    // limpiar imagenes previas


    if (modelo.img) {
        //hay que borrar la imagen del servidor
        const pathimagen = path.join(__dirname, '../uploads', coleccion, modelo.img)

        if (fs.existsSync(pathimagen)) {
            fs.unlinkSync(pathimagen)
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion)

    modelo.img = nombre

    await modelo.save()

    res.json({
        modelo
    })


}


module.exports = {
    ActualizarImagen,
    cargarArchivo
}