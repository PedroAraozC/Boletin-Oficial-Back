const Boletin = require("../models/boletin");
const CustomError = require("../utils/customError");
const path = require("path");
const ArchivoBoletin = require("../models//archivoBoletin");
const multer = require("multer");
const { funcionMulter } = require("../middlewares/multerStorage");
const fs = require("fs");
const archivoBoletin = require("../models//archivoBoletin");
const { conectarMySql } = require("../config/dbMySql");
const { conectarSFTP } = require("../config/dbwinscp");

//mysql
const getBoletinesMySql = async (req, res) => {
  try {
    const db = await conectarMySql();
    const [boletines] = await db.query(
      "SELECT * FROM boletin WHERE habilita = 1"
    );
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines:", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const getBuscarNroMySql = async (req, res) => {
  const { nroBoletin } = req.params;
  try {
    const db = await conectarMySql();
    const [boletines] = await db.query(
      `SELECT * FROM boletin WHERE nro_boletin = ${nroBoletin} AND habilita = 1`
    );
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const getBuscarFechaMySql = async (req, res) => {
  const { fechaBoletin } = req.params;
  try {
    const db = await conectarMySql();
    const [boletines] = await db.query(
      `SELECT * FROM boletin WHERE fecha_publicacion = '${fechaBoletin}' AND habilita = 1`
    );
    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const getBuscarNroYFechaMySql = async (req, res) => {
  const { nroBoletin, fechaBoletin } = req.params;
  try {
    const db = await conectarMySql();

    if (
      nroBoletin !== undefined &&
      nroBoletin !== "" &&
      fechaBoletin !== "" &&
      fechaBoletin !== undefined
    ) {
      const [boletines] = await db.query(
        `SELECT * FROM boletin WHERE fecha_publicacion = '${fechaBoletin}' AND nro_boletin = '${nroBoletin}' AND habilita = 1`
      );
      res.json(boletines);
    }
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const getBuscarPorTipoMySql = async (req, res) => {
  const { tipo, parametro } = req.params;
  let boletines = [];
  try {
    switch (tipo) {
      case "Decreto":
        if (!parametro || parametro === "undefined" || parametro === "") {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 1
            AND b.habilita = 1;`
          );
          break;
        } else {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 1
            AND b.habilita = 1
            AND cb.nro_norma = '${parametro}'; `
          );
          break;
        }

      case "Ordenanza":
        console.log(parametro, "175");
        if (!parametro || parametro === "undefined" || parametro === "") {
          console.log(parametro, "177");
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 2
            AND b.habilita = 1;`
          );
          break;
        } else {
          console.log(parametro, "184");
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 2
            AND b.habilita = 1
            AND cb.nro_norma = '${parametro}'; `
          );
          break;
        }

      case "Resolucion":
        if (!parametro || parametro === "undefined" || parametro === "") {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 2
            AND b.habilita = 1;`
          );
          break;
        } else {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 2
            AND b.habilita = 1
            AND cb.nro_norma = '${parametro}'; `
          );
          break;
        }
      default:
        throw new CustomError("Tipo de búsqueda no válido", 400);
    }

    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
    console.log("value.parametro, value.tipo");
  }
};

const getBuscarPorFechaMySql = async (req, res) => {
  const { fecha, tipo } = req.params;
  let boletines = [];
  try {
    if ((!tipo || tipo === "undefined" || tipo === "") && fecha === "") {
      throw new CustomError("Tipo de búsqueda no válido", 400);
    } else if ((!tipo || tipo === "undefined" || tipo === "") && fecha !== "") {
      const db = await conectarMySql();
      [boletines] = await db.query(
        `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
        FROM contenido_boletin cb
        JOIN boletin b ON cb.id_boletin = b.id_boletin
        WHERE cb.fecha_norma = '${fecha}'
        AND b.habilita = 1;`
      );
    } else if ((tipo !== "undefined" || tipo !== "") && fecha !== "") {
      const db = await conectarMySql();
      switch (tipo) {
        case "Decreto":
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 1
            AND b.habilita = 1
            AND cb.fecha_norma = '${fecha}'; `
          );
          break;

        case "Ordenanza":
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 2
            AND b.habilita = 1
            AND cb.fecha_norma = '${fecha}'; `
          );
          break;

        case "Resolucion":
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 3
            AND b.habilita = 1
            AND cb.fecha_norma = '${fecha}'; `
          );
          break;
        default:
          throw new CustomError("Tipo de búsqueda no válido", 400);
      }
    }

    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const getBuscarPorTodoMySql = async (req, res) => {
  try {
    const { fecha, tipo, nroNorma } = req.params;
    let boletines = [];
    const db = await conectarMySql();
    console.log(req.params);

    if (
      (!tipo || tipo === "undefined" || tipo === "") &&
      fecha === "" &&
      (nroNorma === "" || nroNorma === undefined || !nroNorma)
    ) {
      throw new CustomError("Tipo de búsqueda no válido", 400);
    } else if (
      (tipo !== "undefined" || tipo !== "") &&
      fecha !== "" &&
      (nroNorma !== "" || nroNorma !== undefined)
    ) {
      switch (tipo) {
        case "Decreto":
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 1
            AND b.habilita = 1
            AND cb.fecha_norma = '${fecha}'
            AND cb.nro_norma = '${nroNorma}'; `
          );

          break;

        case "Ordenanza":
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
              FROM contenido_boletin cb
              JOIN boletin b ON cb.id_boletin = b.id_boletin
              WHERE cb.id_norma = 2
              AND b.habilita = 1
              AND cb.fecha_norma = '${fecha}'
              AND cb.nro_norma = '${nroNorma}'; `
          );
          break;

        case "Resolucion":
          [boletines] = await db.query(
            `SELECT b.id_boletin, b.nro_boletin, b.fecha_publicacion
              FROM contenido_boletin cb
              JOIN boletin b ON cb.id_boletin = b.id_boletin
              WHERE cb.id_norma = 3
              AND b.habilita = 1
              AND cb.fecha_norma = '${fecha}'
              AND cb.nro_norma = '${nroNorma}'; `
          );
          break;
        default:
          throw new CustomError("Tipo de búsqueda no válido", 400);
      }
    }

    res.json(boletines);
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const obtenerArchivosDeUnBoletinMySql = async (req, res) => {
  try {
    const idBoletin = req.params.id;
    const rutaArchivo = await construirRutaArchivo(idBoletin); // Función para construir la ruta del archivo
    // console.log(rutaArchivo);

    const sftp = await conectarSFTP();
    // console.log(sftp, "saaaaa")
    if (!sftp || !sftp.sftp) {
      throw new Error(
        "Error de conexión SFTP: no se pudo establecer la conexión correctamente"
      );
    }
    const remoteFilePath = rutaArchivo;
    const fileBuffer = await sftp.get(remoteFilePath);
    res.send(fileBuffer);
    await sftp.end();
    // if (fs.existsSync(rutaArchivo)) {
    //   // console.log(rutaArchivo);
    //   return res.sendFile(rutaArchivo);
    // } else {
    // return res.status(404).json({
    //   // message: "Archivo no encontrado para el boletín especificado",
    // });
    // }
  } catch (error) {
    console.error("Error al obtener archivos de un boletín:", error);
    res.status(500).json({ message: "Error al obtener archivos del boletín" });
  }
};

const construirRutaArchivo = async (idBoletin) => {
  const boletin = await obtenerDatosDelBoletin(idBoletin);
  // console.log(boletin, "hola");
  // const rutaArchivo = `/home/boletin/2024/bol_4359_040124.pdf`;
  const rutaArchivo = `/home/boletin/${boletin.fecha_publicacion
    .toISOString()
    .slice(0, 4)}/bol_${boletin.nro_boletin}_${boletin.fecha_publicacion
    .toISOString()
    .slice(0, 10)}.pdf`;
  //`/home\\boletin\\
  
  console.log(rutaArchivo);
  return rutaArchivo;
};

const obtenerDatosDelBoletin = async (idBoletin) => {
  const db = await conectarMySql();
  const [boletines] = await db.query(
    `SELECT * FROM boletin WHERE id_boletin = ${idBoletin} AND habilita = 1`
  );
  if (boletines.length > 0) {
    return boletines[0];
  } else {
    console.error("Error al obtener archivos de un boletín:", error);
    throw new Error("No se encontraron boletines para el ID especificado");
  }
};

// //Mongo
// const getBuscar = async (req, res) => {
//   const { nroBoletin } = req.params;
//   console.log("+++", nroBoletin);
//   try {
//     const boletines = await Boletin.find({ estado: true, nroBoletin });
//     res.json(boletines);
//   } catch (error) {
//     console.error("Error al buscar boletines: ", error);
//     res.status(500).json({ message: "Error al buscar boletines" });
//   }
// };

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
        "C:\\Users\\Programadores\\Desktop\\Boletin-Oficial-Back\\archivoBoletin",
        // "C:\\Users\\Administrador\\Desktop\\Ditec-Code\\boletin-oficial-back\\archivoBoletin",
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

// const getBoletin = async (req, res) => {
//   try {
//     const boletines = await Boletin.find({ estado: true });
//     res.json(boletines);
//   } catch (error) {
//     console.error("Error al buscar boletines:", error);
//     res.status(500).json({ message: "Error al buscar boletines" });
//   }
// };

// const obtenerArchivosDeUnBoletin = async (req, res) => {
//   try {
//     const idBoletin = req.params.id;
//     const archivosBoletin = await ArchivoBoletin.find({
//       archivoBoletin: idBoletin,
//     });

//     if (archivosBoletin.length === 0) {
//       return res.status(404).json({
//         message: "No se encontraron archivos para el boletin especificado",
//       });
//     } else if (archivosBoletin.length === 1) {
//       const archivo = archivosBoletin[0];
//       if (fs.existsSync(archivo.rutaArchivo)) {
//         return res.sendFile(archivo.rutaArchivo);
//       } else {
//         console.log(archivosBoletin);
//         console.log(archivo.rutaArchivo);
//         throw new CustomError("Archivo no encontrado", 404);
//       }
//     } else {
//       throw new CustomError("Boletín con más de un archivo adjunto", 400);
//     }
//   } catch (error) {
//     console.error("Error al obtener archivos de un boletín:", error);

//     res
//       .status(error.code || 500)
//       .json({ message: error.message || "Algo explotó :|" });
//   }
// };

// const buscarBoletin = async (req, res, query) => {
//   try {
//     const result = await query.exec();
//     res.json(result);
//   } catch (error) {
//     console.error("Error al buscar boletines:", error);
//     res.status(500).json({ message: "Error al buscar boletines" });
//   }
// };

// // probando otro buscador 01 y buscadormio2
// const getBuscarFecha = async (req, res) => {
//   const { fechaBoletin } = req.params;
//   console.log("***", fechaBoletin);

//   try {
//     const boletines = await Boletin.find({ estado: true, fechaBoletin });
//     res.json(boletines);
//   } catch (error) {
//     console.error("Error al buscar boletines: ", error);
//     res.status(500).json({ message: "Error al buscar boletines" });
//   }
// };

// const getBuscarPorTipo = async (req, res) => {
//   const { tipo, parametro } = req.params;
//   let boletines = [];
//   try {
//     switch (tipo) {
//       case "Decreto":
//         if (!parametro || parametro === "undefined" || parametro === "") {
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroDecreto: { $exists: true, $ne: [] },
//           });
//           break;
//         } else {
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroDecreto: { $in: [parametro] },
//           });
//           break;
//         }

//       case "Ordenanza":
//         console.log(parametro, "175");
//         if (!parametro || parametro === "undefined" || parametro === "") {
//           console.log(parametro, "177");
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroOrdenanza: { $exists: true, $ne: [] },
//           });
//           break;
//         } else {
//           console.log(parametro, "184");

//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroOrdenanza: { $in: [parametro] },
//           });
//           break;
//         }

//       case "Resolucion":
//         if (!parametro || parametro === "undefined" || parametro === "") {
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroResolucion: { $exists: true, $ne: [] },
//           });
//           break;
//         } else {
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroResolucion: { $in: [parametro] },
//           });
//           break;
//         }
//       default:
//         throw new CustomError("Tipo de búsqueda no válido", 400);
//     }

//     res.json(boletines);
//   } catch (error) {
//     console.error("Error al buscar boletines: ", error);
//     res.status(500).json({ message: "Error al buscar boletines" });
//     console.log("value.parametro, value.tipo");
//   }
// };

// const getBuscarPorFecha = async (req, res) => {
//   const { fecha, tipo } = req.params;
//   let boletines = [];
//   console.log(req.params);

//   try {
//     if ((!tipo || tipo === "undefined" || tipo === "") && fecha === "") {
//       throw new CustomError("Tipo de búsqueda no válido", 400);
//     } else if ((!tipo || tipo === "undefined" || tipo === "") && fecha !== "") {
//       boletines = await Boletin.find({
//         estado: true,
//         fechaBoletin: fecha,
//       });
//     } else if ((tipo !== "undefined" || tipo !== "") && fecha !== "") {
//       switch (tipo) {
//         case "Decreto":
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroDecreto: { $exists: true, $ne: [] },
//             fechaBoletin: fecha,
//           });
//           break;

//         case "Ordenanza":
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroOrdenanza: { $exists: true, $ne: [] },
//             fechaBoletin: fecha,
//           });
//           break;

//         case "Resolucion":
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroResolucion: { $exists: true, $ne: [] },
//             fechaBoletin: fecha,
//           });
//           break;
//         default:
//           throw new CustomError("Tipo de búsqueda no válido", 400);
//       }
//     }

//     res.json(boletines);
//   } catch (error) {
//     console.error("Error al buscar boletines: ", error);
//     res.status(500).json({ message: "Error al buscar boletines" });
//   }
// };

// const getBuscarNroYFecha = async (req, res) => {
//   const { nroBoletin, fechaBoletin } = req.params;
//   console.log("Número de Boletín:", nroBoletin);
//   console.log("Fecha de Boletín:", fechaBoletin);
//   try {
//     let query = Boletin.find();
//     if (nroBoletin !== undefined && fechaBoletin !== undefined) {
//       query = query.where({ nroBoletin, fechaBoletin });
//     } else {
//       // Agregar condiciones individuales si solo uno de los parámetros está presente
//       if (nroBoletin !== undefined) {
//         query = query.where({ nroBoletin });
//       }

//       if (fechaBoletin !== undefined) {
//         query = query.where({ fechaBoletin });
//       }
//     }

//     const boletines = await query.exec();
//     res.json(boletines);
//   } catch (error) {
//     console.error("Error al buscar boletines: ", error);
//     res.status(500).json({ message: "Error al buscar boletines" });
//   }
// };

// const getBuscarPorTodo = async (req, res) => {
//   const { fecha, tipo, nroNorma } = req.params;
//   let boletines = [];
//   console.log(req.params);

//   try {
//     if (
//       (!tipo || tipo === "undefined" || tipo === "") &&
//       fecha === "" &&
//       (nroNorma === "" || nroNorma === undefined || !nroNorma)
//     ) {
//       throw new CustomError("Tipo de búsqueda no válido", 400);
//     } else if (
//       (tipo !== "undefined" || tipo !== "") &&
//       fecha !== "" &&
//       (nroNorma !== "" || nroNorma !== undefined)
//     ) {
//       switch (tipo) {
//         case "Decreto":
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroDecreto: { $in: [nroNorma] },
//             fechaBoletin: fecha,
//           });

//           break;

//         case "Ordenanza":
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroOrdenanza: { $in: [nroNorma] },
//             fechaBoletin: fecha,
//           });
//           break;

//         case "Resolucion":
//           boletines = await Boletin.find({
//             estado: true, // Si deseas buscar solo boletines activos
//             nroResolucion: { $in: [nroNorma] },
//             fechaBoletin: fecha,
//           });

//           break;
//         default:
//           throw new CustomError("Tipo de búsqueda no válido", 400);
//       }
//     }

//     res.json(boletines);
//   } catch (error) {
//     console.error("Error al buscar boletines: ", error);
//     res.status(500).json({ message: "Error al buscar boletines" });
//   }
// };

module.exports = {
  agregarBoletin,
  getBoletinesMySql,
  getBuscarNroMySql,
  getBuscarFechaMySql,
  getBuscarNroYFechaMySql,
  getBuscarPorTipoMySql,
  getBuscarPorFechaMySql,
  getBuscarPorTodoMySql,
  obtenerArchivosDeUnBoletinMySql,
  // getBoletin,
  // getBuscar,
  // getBuscarFecha,
  // getBuscarNroYFecha,
  // getBuscarPorTipo,
  // getBuscarPorFecha,
  // getBuscarPorTodo,
  // obtenerArchivosDeUnBoletin,
};
