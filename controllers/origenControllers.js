const CustomError = require("../utils/customError");
const { conectarMySql } = require("../config/dbMySql");

const getOrigen = async (req, res) => {
  try {
    const db = await conectarMySql();
    if (!db || !db.query) {
      throw new CustomError(
        "Database connection or query function is missing",
        500
      );
    }
    const [origen] = await db.query("SELECT * FROM origen WHERE habilita = 1");
    res.json(origen);
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar origen:", error);
    res.status(500).json({ message: "Error al buscar origen" });
  }
};

const getOrigenTodo = async (req, res) => {
  try {
    const db = await conectarMySql();
    if (!db || !db.query) {
      throw new CustomError(
        "Database connection or query function is missing",
        500
      );
    }
    const [origen] = await db.query("SELECT * FROM origen");
    res.json(origen);
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar origen:", error);
    res.status(500).json({ message: "Error al buscar origen" });
  }
};

const putOrigenListado = async (req, res) => {
  try {
    const db = await conectarMySql();
    const { id_origen, nombre_origen, habilita } = req.body;
    await db.query(
      "UPDATE origen SET id_origen = ?, nombre_origen = ?, habilita = ? WHERE id_origen = ?",
      [id_origen, nombre_origen, habilita, id_origen]
    );
    res.status(200).json({ message: "Origen actualizado con éxito" });
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al actualizar Origen:", error);
    res.status(500).json({ message: "Error al actualizar Origen" });
  }
};

const postOrigen = async (req, res) => {
  try {
    const db = await conectarMySql();
    if (!db || !db.query) {
      throw new CustomError(
        "Database connection or query function is missing",
        500
      );
    }
    const [result] = await db.query(
      "INSERT INTO origen (nombre_origen, habilita) VALUES ( ?, ?)",
      [req.body.nombre_origen.toUpperCase(), req.body.habilita]
    );
    res.json(result);
    await db.end();
  } catch (error) {
    console.error("Error al agregar origen:", error);
    res.status(500).json({ message: "Error al agregar origen" });
  }
};

module.exports = {
  getOrigen,
  getOrigenTodo,
  postOrigen,
  putOrigenListado,
};