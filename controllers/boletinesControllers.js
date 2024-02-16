const Boletin = require("../models/boletin");
const CustomError = require("../utils/customError");
const path = require("path");
const ArchivoBoletin = require("../models//archivoBoletin");
const multer = require("multer");
const {funcionMulter} = require("../middlewares/multerStorage")
const fs = require("fs");

const agregarBoletin = async (req, res) => {
  try {
    funcionMulter()(req, res, async (err) => {
       
      if (!req.file) {
        throw new CustomError("Error al cargar el archivo", 400);
      }

      console.log(req.body,"19");
      console.log(req.file, "20");
      
      const requestData = JSON.parse(req.body.requestData[1]);
      
      console.log(JSON.parse(req.body.requestData[1]),"24")

      const {
        nroBoletin,
        fechaBoletin,
        nroDecreto,
        nroOrdenanza,
        nroResolucion,
      } = requestData;

      const newBoletin = new Boletin({
        nroBoletin,
        fechaBoletin,
         nroDecreto,
        nroOrdenanza,
        nroResolucion,
      });

       const boletinGuardado = await newBoletin.save();
       if (!req.file) {
        throw new CustomError("File not provided", 400);
      }
      console.log(typeof( req.file.fieldname), "51");

     const rutaArchivo = path.join(__dirname, "../archivoBoletin", req.file.fieldname);

     const newArchivoBoletin = new ArchivoBoletin({
       rutaArchivo,
       archivoBoletin: boletinGuardado._id,
     });

     await newArchivoBoletin.save();
     
      res.status(200).json({ message: "Se agregó un nuevo Boletín con éxito" });
    });
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
