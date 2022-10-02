const bcryptjs = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { sendMessage } = require("../whatsapp/mensaje");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    res.json(usuario);
  } catch (error) {
    res.json(error);
  }
};
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    res.json(usuario);
  } catch (error) {
    res.json(error);
  }
};

const crearUsuarios = async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    const usuarioCreado = await Usuario.create({
      nombre,
      email,
      password,
      telefono,
    });

    const salt = bcryptjs.genSaltSync();
    usuarioCreado.password = bcryptjs.hashSync(password, salt);

    await usuarioCreado.save();
    // await sendMessage(usuarioCreado.telefono, usuarioCreado.nombre)

    res.json({
      usuarioCreado,
    });
  } catch (error) {
    res.json(error);
  }
};
const ActualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const usuarioActualizado = await Usuario.findByPk(id);
    await usuarioActualizado.update(body);

    res.json({
      usuarioActualizado,
    });
  } catch (error) {
    res.json(error);
  }
};
const EliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const UsuarioEliminado = await Usuario.findByPk(id);
    await UsuarioEliminado.destroy();

    res.json({
      UsuarioEliminado,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuarios,
  ActualizarUsuario,
  EliminarUsuario,
};
