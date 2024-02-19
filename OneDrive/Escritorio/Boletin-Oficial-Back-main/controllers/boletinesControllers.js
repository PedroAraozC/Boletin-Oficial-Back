const Boletin = require("../models/boletin");
const CustomError = require("../utils/customError");
const path = require("path");
const fs = require("fs");
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
    const { nroBoletin } = req.params
    console.log('+++', nroBoletin)
    try {
      const boletines = await Boletin.find({nroBoletin});
      res.json(boletines);
    } catch (error) {
      console.error("Error al buscar boletines: ", error);
      res.status(500).json({ message: "Error al buscar boletines" });
    }
    
  }; 

// probando otro buscador 01 y buscadormio2
const getBuscarFecha = async (req, res) => {
  const { fechaBoletin } = req.params
  console.log('***', fechaBoletin)

  try {
    const boletines = await Boletin.find({fechaBoletin});
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
  
}; 
const getBuscarDecreto = async (req, res) => {
  const { nroDecreto } = req.params
  console.log('+++', nroDecreto)
  try {
    const boletines = await Boletin.find({nroDecreto});
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar Decreto: ", error);
    res.status(500).json({ message: "Error al buscar Decreto" });
  }
  
}; 
const getBuscarOrdenanza = async (req, res) => {
  const { nroOrdenanza } = req.params
  console.log('+++', nroBoletin)
  try {
    const boletines = await Boletin.find({nroOrdenanza});
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar Ordenanza: ", error);
    res.status(500).json({ message: "Error al buscar Ordenanza" });
  }
  
}; 
const getBuscarResolucion = async (req, res) => {
  const { nroResolucion} = req.params
  console.log('+++', nroResolucion)
  try {
    const boletines = await Boletin.find({nroResolucion});
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar Resolucion: ", error);
    res.status(500).json({ message: "Error al buscar Resolucion" });
  }
  
}; 

const getBuscarNroYFecha = async (req, res) => {
  const { nroBoletin, fechaBoletin } = req.params
  console.log('Número de Boletín:', nroBoletin);
  console.log('Fecha de Boletín:', fechaBoletin);
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




  // const getBuscar = async (req, res) => {
  //   const { nroBoletin, fechaBoletin } = req.params
  //   console.log('+++', nroBoletin, '***', fechaBoletin)
  //   try {
  //     let query = undefined

  //     if (nroBoletin !== undefined) {
  //       query = Boletin.findOne({nroBoletin})
  //     }
  //     if (fechaBoletin !== undefined) {
  //       query = Boletin.find({fechaBoletin})
  //     }
  //     const boletines = await query.exec()

  //     res.json(boletines);
  //   } catch (error) {
  //     console.error("Error al buscar boletines: ", error);
  //     res.status(500).json({ message: "Error al buscar boletines" });
  //   }
    
  // }; 



    
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
  getBuscarFecha,
  getBuscarDecreto,
  getBuscarOrdenanza,
  getBuscarResolucion,
  getBuscarNroYFecha,
  // getReportesHistorico,
  // actualizarReporte,
  // borrarReporte,
  // getReportesPodio,
  // getReportesPaginacion,
  // getMesYTotalDeReportesVisualizadorYSupervisor,
  // getTopTresDespachadosPorMes,
}
