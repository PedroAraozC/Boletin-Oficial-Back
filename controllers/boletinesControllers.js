const Boletin = require("../models/boletin");
const CustomError = require("../utils/customError");
const path = require("path");
const fs = require("fs");
const archivoBoletin = require("../models//archivoBoletin");

const agregarBoletin = async (req, res) => {
  const {
    nroBoletin,
    fechaBoletin,
    archivoBoletin,
    nroDecreto,
    nroOrdenanza,
    nroResolucion,
  } = req.body;
  console.log(req.body)
  // const numeroBoletin = parseInt([nroBoletin])
  // console.log(numeroBoletin)
  // const numeroResolucion = JSON.parse([nroResolucion])
  // const numeroDecreto = JSON.parse([nroDecreto])
  // const numeroOrdenanza = JSON.parse([nroOrdenanza])


  const folderPath =
    "C:\\Users\\Administrador\\Desktop\\Ditec-Code\\boletin-oficial-back\\uploads";

  fs.readdir(folderPath, async (err, files) => {
    if (err) {
      console.error("Error al leer la carpeta:", err);
      // Maneja el error aquí si es necesario.
      res.status(500).json({ message: "Error al leer la carpeta" });
    } else {
      try {
        // if (!req.file) {
        //   return res
        //     .status(400)
        //     .json({ message: "No se proporcionó ningún archivo PDF" });
        // }

        const newBoletin = new Boletin({
          nroBoletin ,
          fechaBoletin,
          // rutaPdf: req.file.path, // Guardar la ruta del archivo PDF
          archivoBoletin,
          nroDecreto,
          nroOrdenanza,
          nroResolucion,
        });

        const boletinNuevo = await newBoletin.save();
        // Guardar el archivo en la ruta especificada
        // const pdfPath = path.join(__dirname, "../uploads", req.file.filename);
        // fs.writeFileSync(pdfPath, req.file.buffer);

        const filePath = path.join(folderPath, req.archivoBoletin.filename); // Ruta completa al archivo

        const newArchivoBoletin = new archivoBoletin({
          rutaArchivo: filePath,
          noticia: boletinNuevo._id,
        });

        await newArchivoBoletin.save();
        // Crear el nuevo boletín

        res
          .status(200)
          .json({ message: "Se agregó un nuevo Boletín con éxito" });
      } catch (error) {
        console.error("Error al agregar boletín:", error);
        res.status(500).json({ message: "Error al agregar Boletín" });
      }
    }
  });
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
