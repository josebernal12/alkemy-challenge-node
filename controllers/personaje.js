const Pelicula = require("../models/peliculas");
const Personaje = require("../models/personaje");
const Genero = require("../models/genero");

const DetalleDelPersonaje = async (req, res) => {
  try {
    const personaje = await Personaje.findAll({
      include: [
        {
          model: Pelicula,
        },
      ],
    });

    res.json({ personaje });
  } catch (error) {
    res.json(error);
  }
};

const ListarPersonaje = async (req, res) => {
  try {
    const personaje = await Personaje.findAll({
      attributes: ["nombre", "img"],
    });
    res.json(personaje);
  } catch (error) {
    res.json(error);
  }
};

const crearPersonaje = async (req, res) => {
  try {
    const { nombre, edad, peso, historia, peliculaId } = req.body;

    const nameBD = await Personaje.findOne({ where: { nombre: nombre } });

    if (nameBD) {
      return res.json(`el personaje ${nameBD.nombre} ya existe en la BD`);
    }

    const pelicula = await Pelicula.findOne({ where: { id: peliculaId } });
    if (!pelicula) {
      return res.json("la pelicula no existe!");
    }
    const personaje = await Personaje.create({
      nombre,
      edad,
      peso,
      historia,
      peliculaId,
    });

    const personajesDB = await personaje.save();

    res.json({
      personajesDB,
    });
  } catch (error) {
    res.json(error);
  }
};

const actualizarPersonaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    
    const personajeActualizado = await Personaje.findByPk(id);

    const personaje = await personajeActualizado.update(body);

    res.json(personaje);
  } catch (error) {
    res.json(error);
  }
};

const eliminarPersonaje = async (req, res) => {
  try {
    const { id } = req.params;

    const personajeEliminado = await Personaje.findByPk(id);

    const personaje = await personajeEliminado.destroy();

    res.json(personaje);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  DetalleDelPersonaje,
  ListarPersonaje,
  crearPersonaje,
  actualizarPersonaje,
  eliminarPersonaje,
};
