const Boletin = require("../models/boletin");
const CustomError = require("../utils/customError");
const path = require("path");
const fs = require("fs");
const boletin = require("../models/boletin");
// const obtenerPeriodoDelDiaConHora = require("../utils/helpers");

const agregarBoletin = async (req, res) => {
  const {
    fechaBoletin,
    estado,
    nroBoletin,
    // rutaPdf,
    archivoBoletin,
    nroDecreto,
    nroOrdenanza,
    nroResolucion,
  } = req.body;

  // const folderPath = `C:\\Users\\g.alonso\\Desktop\\SysGesCOM-back\\uploads\\${userName}`;

  // fs.readdir(folderPath, async (err, files) => {
  //   if (err) {
  //     console.error("Error al leer la carpeta:", err);
  //     // Maneja el error aquí si es necesario.
  //     res.status(500).json({ message: "Error al leer la carpeta" });
  //   } else {
  try {
    // const lastFile = files[files.length - 1];
    // const filePath = path.join(folderPath, lastFile);

    // const ultimoReporte = await Reporte.find().sort({ _id: -1 }).limit(1);
    // const nuevoNumeroDeReporte =
    //   ultimoReporte.length > 0 ? ultimoReporte[0].numero + 1 : 1;

    // // Verificar si el número de reporte ya existe en la colección
    // const existeReporte = await Reporte.findOne({
    //   numero: nuevoNumeroDeReporte,
    // });

    // if (existeReporte) {
    //   res.status(400).json({ message: "Intente de nuevo en breve" });
    // } else {

    const newBoletin = new Boletin({
      fechaBoletin,
      estado,
      nroBoletin,
      // rutaPdf,
      // archivoBoletin,
      nroDecreto,
      nroOrdenanza,
      nroResolucion,
    });

    await newBoletin.save();
    res.status(200).json({ message: "Se agregó un nuevo Boletín con éxito" });
  } catch (error) {
    // Manejar el error
    if (error.name === "MongoServerError" && error.code === 11000) {
      // Clave duplicada para nroBoletin
      res.status(400).json({ message: "El número de boletín ya existe" });
    } else {
      // Otro tipo de error
      res.status(500).json({ message: "Error al crear Boletín" });
    }
  }
  // }});
};


const getBoletin = async (req, res) => {
    try {
      const boletines = await Boletin.find({});
      res.json(boletines);
    } catch (error) {
      console.error("Error al buscar boletines: ", error);
      res.status(500).json({ message: "Error al buscar boletines" });
    }
  }
  
    const getBuscar = async (req, res) => {
  
      const {nroBoletin} = req.params  // Se obtiene el parámetro nroBoletin de la URL
     
      try {  // Se utiliza el modelo Boletin para buscar un boletín 
        //en la base de datos por el número de boletín
        if (req.params.nroBoletin) {
          const boletines = await Boletin.findOne({nroBoletin});
          if (!boletines) throw new CustomError("Boletin no encontrado", 404);

          return res.status(404).json({ message: "Boletín no encontrado" });
        }
        res.json(boletines);
      } catch (error) {
        console.error("Error al buscar boletines: ", error);
        // Si ocurre un error durante la búsqueda, se devuelve un código
        // de estado 500 con un mensaje de error
        res.status(500).json({ message: "Error al buscar boletines" });
      }
      
    };






    
  // {
  //   try {
  //   if (req.params.id) {
  //     const boletin = await boletin.findById(req.params.id);
  //     if (!boletin) throw new CustomError("Boletin no encontrado", 404);

  //     //   if (fs.existsSync(reporte.rutaImagen)) {
  //     //     res.sendFile(reporte.rutaImagen);
  //     //   } else {
  //     //     throw new CustomError("Imágen no encontrada", 404);
  //     //   }
  //     // } else {
  //  

module.exports = {
  agregarBoletin,
  getBoletin,
  getBuscar,
  // getReportesHistorico,
  // actualizarReporte,
  // borrarReporte,
  // getReportesPodio,
  // getReportesPaginacion,
  // getMesYTotalDeReportesVisualizadorYSupervisor,
  // getTopTresDespachadosPorMes,
}
