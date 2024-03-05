const Boletin = require("../models/boletin");
const CustomError = require("../utils/customError");
const path = require("path");
const fs = require("fs");

const agregarBoletin = async (req, res) => {
  const {
    fechaBoletin,
    estado,
    nroBoletin,
    nroDecreto,
    nroOrdenanza,
    nroResolucion,
  } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se proporcionó ningún archivo PDF" });
    }

    // Guardar el archivo en la ruta especificada
    // const pdfPath = path.join(__dirname, "../uploads", req.file.filename);
    // fs.writeFileSync(pdfPath, req.file.buffer);

    // Crear el nuevo boletín
    const newBoletin = new Boletin({
      fechaBoletin,
      estado,
      nroBoletin,
      rutaPdf: req.file.path, // Guardar la ruta del archivo PDF
      nroDecreto,
      nroOrdenanza,
      nroResolucion,
    });

    await newBoletin.save();
    
    res.status(200).json({ message: "Se agregó un nuevo Boletín con éxito" });
  } catch (error) {
    console.error("Error al agregar boletín:", error);
    res.status(500).json({ message: "Error al agregar Boletín" });
  }
};

const getBoletin = async (req, res) => {
  try {
    const boletines = await Boletin.find();
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines:", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

module.exports = {
  agregarBoletin,
  getBoletin,
};
