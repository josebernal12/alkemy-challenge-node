const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res) => {
  try {
    const { password } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!usuario) {
      return res.status(400).json({
        msg: "usuario / password no s3on correctos",
      });
    }

    console.log(usuario);
    const validpassword = bcryptjs.compareSync(password, usuario.password);

    if (!validpassword) {
      return res.status(400).json({
        msg: "usuario / passwo4rd no son correctos",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  login,
};
