const CustomError = require("../utils/customError");
const {
  conectarBDEstadisticasMySql,
} = require("../config/dbEstadisticasMYSQL");

const getAuthStatus = async (req, res) => {
  try {
    const id = req.id;

    const connection = await conectarBDEstadisticasMySql();
    const [user] = await connection.execute(
      "SELECT * FROM persona WHERE id_persona = ?",
      [id]
    );

    if (user.length == 0) throw new CustomError("Autenticación fallida", 401);
    const { clave, ...usuarioSinContraseña } = user[0];
    await connection.end();
    res.status(200).json({ usuarioSinContraseña });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

module.exports = { getAuthStatus };
