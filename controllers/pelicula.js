const Pelicula = require("../models/peliculas");
const Personaje = require("../models/personaje");
const Genero = require("../models/genero");

const listarPelicula = async (req, res) => {
  try {
    const pelicula = await Pelicula.findAll({
      attributes: ["img", "titulo", "fecha"],
    });
    res.json(pelicula);
  } catch (error) {
    res.json(error);
  }
};

const DetallePeliculas = async (req, res) => {
  try {
    const pelicula = await Pelicula.findAll({
      include: {
        model: Personaje,
        attributes: ["nombre", "edad"],
      },
    });

    res.json({ pelicula });
  } catch (error) {
    res.json(error);
  }
};

const crearPelicula = async (req, res) => {
  try {
    const { titulo, fecha, calificacion, personajeId, generoId } = req.body;

    // const personaje = await Personaje.findOne({ where: { id: personajeId } });
    // const genero = await Genero.findOne({ where: { id: generoId } });

    // if (!personaje || !genero) {
    //   return res.json("personaje o genero no existe");
    // }

    const peliculaCreada = await Pelicula.create({
      titulo,
      fecha,
      calificacion,
      personajeId,
      generoId,
    });

    res.json({
      peliculaCreada,
    });
  } catch (error) {
    res.json(error);
  }
};

const actualizarPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const { body } = req;
    // const personaje = await Personaje.findOne({
    //   where: { id: body.personajeId },
    // });
    // const genero = await Genero.findOne({ where: { id: body.generoId } });

    // if (!personaje || !genero) {
    //   return res.json("personaje o genero no existe");
    // }

    const peliculaActualizada = await Pelicula.findByPk(id);

    await peliculaActualizada.update(body);

    res.json({
      peliculaActualizada,
    });
  } catch (error) {
    res.json(error);
  }
};

const eliminarPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const peliculaEliminada = await Pelicula.findByPk(id);

    await peliculaEliminada.destroy();

    res.json({
      peliculaEliminada,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  crearPelicula,
  DetallePeliculas,
  listarPelicula,
  actualizarPelicula,
  eliminarPelicula,
};
