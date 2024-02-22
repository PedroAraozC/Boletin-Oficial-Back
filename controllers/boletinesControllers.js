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
        "C:\\Users\\Administrador\\Desktop\\Ditec-Code\\boletin-oficial-back\\archivoBoletin",
        req.file.filename
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
    const idBoletin = req.params.id;
    const archivosBoletin = await ArchivoBoletin.find({
      archivoBoletin: idBoletin,
    });

    if (archivosBoletin.length === 0) {
      return res.status(404).json({
        message: "No se encontraron archivos para el boletin especificado",
      });
    } else if (archivosBoletin.length === 1) {
      const archivo = archivosBoletin[0];
      if (fs.existsSync(archivo.rutaArchivo)) {
        return res.sendFile(archivo.rutaArchivo);
      } else {
        console.log(archivosBoletin);
        console.log(archivo.rutaArchivo);
        throw new CustomError("Archivo no encontrado", 404);
      }
    } else {
      throw new CustomError("Boletín con más de un archivo adjunto", 400);
    }
  } catch (error) {
    console.error("Error al obtener archivos de un boletín:", error);

    res
      .status(error.code || 500)
      .json({ message: error.message || "Algo explotó :|" });
  }
};

const buscarBoletin = async (req, res, query) => {
  try {
    const result = await query.exec();
    res.json(result);
  } catch (error) {
    console.error("Error al buscar boletines:", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const getBuscar = async (req, res) => {
  const { nroBoletin } = req.params;
  console.log("+++", nroBoletin);
  try {
    const boletines = await Boletin.find({ nroBoletin });
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

// probando otro buscador 01 y buscadormio2
const getBuscarFecha = async (req, res) => {
  const { fechaBoletin } = req.params;
  console.log("***", fechaBoletin);

  try {
    const boletines = await Boletin.find({ fechaBoletin });
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const getBuscarPorTipo = async (req, res) => {
  const { tipo, parametro } = req.params;
  let query;
  
  switch (tipo) {
    case 'nroDecreto':
    case 'nroOrdenanza':
    case 'nroResolucion':
      query = Boletin.find({ [tipo]: parametro });
      break;
    default:
      throw new CustomError("Tipo de búsqueda no válido", 400);
  }

  buscarBoletin(req, res, query);
};

const getBuscarDecreto = async (req, res) => {
  const { nroDecreto } = req.params;
  console.log("+++", nroDecreto);
  try {
    const boletines = await Boletin.find({ nroDecreto });
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar Decreto: ", error);
    res.status(500).json({ message: "Error al buscar Decreto" });
  }
};
const getBuscarOrdenanza = async (req, res) => {
  const { nroOrdenanza } = req.params;
  console.log("+++", nroBoletin);
  try {
    const boletines = await Boletin.find({ nroOrdenanza });
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar Ordenanza: ", error);
    res.status(500).json({ message: "Error al buscar Ordenanza" });
  }
};
const getBuscarResolucion = async (req, res) => {
  const { nroResolucion } = req.params;
  console.log("+++", nroResolucion);
  try {
    const boletines = await Boletin.find({ nroResolucion });
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar Resolucion: ", error);
    res.status(500).json({ message: "Error al buscar Resolucion" });
  }
};

const getBuscarNroYFecha = async (req, res) => {
  const { nroBoletin, fechaBoletin } = req.params;
  console.log("Número de Boletín:", nroBoletin);
  console.log("Fecha de Boletín:", fechaBoletin);
  try {
    let query = Boletin.find();
    if (nroBoletin !== undefined && fechaBoletin !== undefined) {
      query = query.where({ nroBoletin, fechaBoletin });
    } else {
      // Agregar condiciones individuales si solo uno de los parámetros está presente
      if (nroBoletin !== undefined) {
        query = query.where({ nroBoletin });
      }

      if (fechaBoletin !== undefined) {
        query = query.where({ fechaBoletin });
      }
    }

    const boletines = await query.exec();
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

module.exports = {
  agregarBoletin,
  getBoletin,
  getBuscar,
  obtenerArchivosDeUnBoletin,
  getBuscarFecha,
  getBuscarNroYFecha,
  getBuscarPorTipo
};
