const CustomError = require("../utils/customError");
const path = require("path");
const { conectarMySql } = require("../config/dbMySql");
// const db = conectarMySql();

const getNormas = async (req, res) => {
  try {
    const db = await conectarMySql();
    if (!db || !db.query) {
      throw new CustomError("Database connection or query function is missing", 500);
    }const [normas] = await db.query( "SELECT * FROM norma WHERE habilita = 1");
    // console.log([normas])
    res.json(normas);
  } catch (error) {
    console.error("Error al buscar norma:", error);
    res.status(500).json({ message: "Error al buscar norma" });
  }
};

const putNormas = async (req, res) => {
  try {
    const db = await conectarMySql();
    console.log(req.body);
    const { id_norma, tipo_norma, habilita } = req.body;
    
    // Log para verificar los valores de los parámetros
    console.log('Valores de los parámetros:', id_norma, tipo_norma, habilita);
    
    // Ejecutar la consulta SQL
    await db.query(
      'UPDATE norma SET id_norma = ?, tipo_norma = ?, habilita = ? WHERE id_norma = ?',
      [id_norma, tipo_norma, habilita, id_norma] // Aquí, se deben pasar los parámetros como una matriz plana
    );
    
    // Respuesta exitosa
    res.status(200).json({ message: 'Norma actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar norma:', error);
    res.status(500).json({ message: 'Error al actualizar Norma' });
  }
};


const getNormasTodo = async (req, res) => {
  try {
    const db = await conectarMySql();
    if (!db || !db.query) {
      throw new CustomError("Database connection or query function is missing", 500);
    }const [normas] = await db.query( "SELECT * FROM norma");
    // console.log([normas])
    res.json(normas);
  } catch (error) {
    console.error("Error al buscar norma:", error);
    res.status(500).json({ message: "Error al buscar norma" });
  }
};


// // Función para obtener todas las normas
// Norma.getAllNormas = async () => {
//   try {
//     const [rows] = await db.query("SELECT * FROM norma");
//     return rows;
//   } catch (error) {
//     console.error("Error al obtener las normas:", error);
//     throw error;
//   }
// };

// // Función para obtener una norma por su ID
// Norma.getNormaById = async (id) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM norma WHERE id_norma = ?", [
//       id,
//     ]);
//     return rows[0];
//   } catch (error) {
//     console.error("Error al obtener la norma por ID:", error);
//     throw error;
//   }
// };

// // Función para crear una nueva norma
// Norma.createNorma = async (tipo_norma, habilita) => {
//   try {
//     const [result] = await db.query(
//       "INSERT INTO norma (tipo_norma, habilita) VALUES (?, ?)",
//       [tipo_norma, habilita]
//     );
//     return result.insertId;
//   } catch (error) {
//     console.error("Error al crear una nueva norma:", error);
//     throw error;
//   }
// };

// // Función para actualizar una norma existente
// Norma.updateNorma = async (id, tipo_norma, habilita) => {
//   try {
//     await db.query(
//       "UPDATE norma SET tipo_norma = ?, habilita = ? WHERE id_norma = ?",
//       [tipo_norma, habilita, id]
//     );
//     return true;
//   } catch (error) {
//     console.error("Error al actualizar la norma:", error);
//     throw error;
//   }
// };

// // Función para eliminar una norma
// Norma.deleteNorma = async (id) => {
//   try {
//     await db.query("DELETE FROM norma WHERE id_norma = ?", [id]);
//     return true;
//   } catch (error) {
//     console.error("Error al eliminar la norma:", error);
//     throw error;
//   }
// };

module.exports = { getNormas, putNormas, getNormasTodo };
