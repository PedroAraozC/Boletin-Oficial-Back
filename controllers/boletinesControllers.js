const Boletin = require("../models/boletin");
const CustomError = require("../utils/customError");
const path = require("path");
const ArchivoBoletin = require("../models//archivoBoletin");
const multer = require("multer");
const { funcionMulter } = require("../middlewares/multerStorage");
const fs = require("fs");
const archivoBoletin = require("../models//archivoBoletin");

const agregarBoletin = async (req, res) => {
  try {
    funcionMulter()(req, res, async (err) => {
      if (!req.file) {
        throw new CustomError("Error al cargar el archivo", 400);
      }

      console.log(req.body, "16");
      console.log(req.file, "17");

      let requestData = "";

      if (req.body.requestData === undefined) {
        requestData = JSON.parse(req.body.requestData[1]);
        console.log("hola");
      } else {
        requestData = JSON.parse(req.body.requestData);
        console.log("adios");
      }

      // console.log(values.JSON.parse(req.body.requestData[1]), "29");
      console.log(req.body.requestData[1], "30");
      console.log(requestData, "31");

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
      console.log(typeof req.file.fieldname, "51");

      const rutaArchivo = path.join(
        __dirname,
        "../archivoBoletin",
        req.file.fieldname
      );

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

const obtenerArchivosDeUnBoletin = async (req, res) => {
  try {
    const archivosBoletin = await archivoBoletin
      .find({ boletin: req.params.id })
      .populate("boletin");

      console.log(archivosBoletin)

    if (archivosBoletin.length > 1) {
      const zip = archiver("zip");

      res.attachment("archivosBoletin.zip");
      zip.pipe(res);

      archivosBoletin.forEach((archivo) => {
        if (fs.existsSync(archivo.rutaArchivo)) {
          const partesRuta = archivo.rutaArchivo.split("\\");
          const nombreArchivo = partesRuta[partesRuta.length - 1];
          zip.append(fs.createReadStream(archivo.rutaArchivo), {
            name: nombreArchivo,
          });
        } else {
          throw new CustomError("archivo no encontrado", 404);
        }
      });

      zip.finalize();
    } else if (archivosBoletin.length == 0) {
      throw new CustomError("Boletin sin archivos", 404);
    } else {
      if (fs.existsSync(archivosBoletin[0].rutaArchivo)) {
        res.sendFile(archivosBoletin[0].rutaArchivo);
      } else {
        throw new CustomError("archivo no encontrado", 404);
      }
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

module.exports = {
  agregarBoletin,
  getBoletin,
  obtenerArchivosDeUnBoletin,
};
