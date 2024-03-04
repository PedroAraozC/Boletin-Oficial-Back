const { conectarMySql } = require('../config/dbMySql');
const db = conectarMySql();

const Norma = {};

// Función para obtener todas las normas
Norma.getAllNormas = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM norma');
    return rows;
  } catch (error) {
    console.error("Error al obtener las normas:", error);
    throw error;
  }
};

// Función para obtener una norma por su ID
Norma.getNormaById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM norma WHERE id_norma = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error("Error al obtener la norma por ID:", error);
    throw error;
  }
};

// Función para crear una nueva norma
Norma.createNorma = async (tipo_norma, habilita) => {
  try {
    const [result] = await db.query('INSERT INTO norma (tipo_norma, habilita) VALUES (?, ?)', [tipo_norma, habilita]);
    return result.insertId;
  } catch (error) {
    console.error("Error al crear una nueva norma:", error);
    throw error;
  }
};

// Función para actualizar una norma existente
Norma.updateNorma = async (id, tipo_norma, habilita) => {
  try {
    await db.query('UPDATE norma SET tipo_norma = ?, habilita = ? WHERE id_norma = ?', [tipo_norma, habilita, id]);
    return true;
  } catch (error) {
    console.error("Error al actualizar la norma:", error);
    throw error;
  }
};

// Función para eliminar una norma
Norma.deleteNorma = async (id) => {
  try {
    await db.query('DELETE FROM norma WHERE id_norma = ?', [id]);
    return true;
  } catch (error) {
    console.error("Error al eliminar la norma:", error);
    throw error;
  }
};

module.exports = Norma;
