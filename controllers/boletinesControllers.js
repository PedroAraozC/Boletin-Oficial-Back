const CustomError = require("../utils/customError");
const { conectarMySql } = require("../config/dbMySql");
const { conectarSFTP } = require("../config/dbwinscp");
const { funcionMulter } = require("../middlewares/multerStorage");

//mysql
const getBoletinesMySql = async (req, res) => {
  try {
    const db = await conectarMySql();
    const [boletines] = await db.query(
      "SELECT * FROM boletin WHERE habilita = 1"
    );
    res.json(boletines);
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar boletines:", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};


const getBoletinesListado = async (req, res) => {
  try {
    const db = await conectarMySql();
    const [boletines] = await db.query(
      "SELECT * FROM boletin"
    );
    res.json(boletines);
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar boletines:", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};


const getOrigen = async (req, res) => {
  try {
    const db = await conectarMySql();
    if (!db || !db.query) {
      throw new CustomError(
        "Database connection or query function is missing",
        500
      );
    }
    const [origen] = await db.query("SELECT * FROM origen WHERE habilita = 1");
    console.log([origen]);
    res.json(origen);
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar origen:", error);
    res.status(500).json({ message: "Error al buscar origen" });
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
    await db.end();
  } catch (error) {
    await db.end();
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
    await db.end();
  } catch (error) {
    await db.end();
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
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const getBuscarPorTipoMySql = async (req, res) => {
  const { tipo, parametro } = req.params;
  let boletines = [];

  try {
    switch (tipo) {
      case "DECRETO":
        if (!parametro || parametro === "undefined" || parametro === "") {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 1
            AND b.habilita = 1;`
          );
          break;
        } else {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 1
            AND b.habilita = 1
            AND cb.nro_norma = '${parametro}'; `
          );
          break;
        }

      case "ORDENANZA":
        if (!parametro || parametro === "undefined" || parametro === "") {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 2
            AND b.habilita = 1;`
          );
          break;
        } else {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 2
            AND b.habilita = 1
            AND cb.nro_norma = '${parametro}'; `
          );
          break;
        }

      case "RESOLUCION":
        if (!parametro || parametro === "undefined" || parametro === "") {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 3
            AND b.habilita = 1;`
          );
          break;
        } else {
          const db = await conectarMySql();
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 3
            AND b.habilita = 1
            AND cb.nro_norma = '${parametro}'; `
          );
          break;
        }
      default:
        throw new CustomError("Tipo de búsqueda no válido", 400);
    }

    res.json(boletines);
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
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
        `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
        FROM contenido_boletin cb
        JOIN boletin b ON cb.id_boletin = b.id_boletin
        WHERE cb.fecha_norma = '${fecha}'
        AND b.habilita = 1;`
      );
    } else if ((tipo !== "undefined" || tipo !== "") && fecha !== "") {
      const db = await conectarMySql();
      switch (tipo) {
        case "DECRETO":
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 1
            AND b.habilita = 1
            AND cb.fecha_norma = '${fecha}'; `
          );
          break;

        case "ORDENANZA":
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 2
            AND b.habilita = 1
            AND cb.fecha_norma = '${fecha}'; `
          );
          break;

        case "RESOLUCION":
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
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
    await db.end();
  } catch (error) {
    await db.end();
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
        case "DECRETO":
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
            FROM contenido_boletin cb
            JOIN boletin b ON cb.id_boletin = b.id_boletin
            WHERE cb.id_norma = 1
            AND b.habilita = 1
            AND cb.fecha_norma = '${fecha}'
            AND cb.nro_norma = '${nroNorma}'; `
          );

          break;

        case "ORDENANZA":
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
              FROM contenido_boletin cb
              JOIN boletin b ON cb.id_boletin = b.id_boletin
              WHERE cb.id_norma = 2
              AND b.habilita = 1
              AND cb.fecha_norma = '${fecha}'
              AND cb.nro_norma = '${nroNorma}'; `
          );
          break;

        case "RESOLUCION":
          [boletines] = await db.query(
            `SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
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
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const obtenerArchivosDeUnBoletinMySql = async (req, res) => {
  try {
    const idBoletin = req.params.id;
    const rutaArchivo = await construirRutaArchivo(idBoletin);
    //VERIFICAR CREDENCIALES PARA ACCEDER A RUTA SERVIDOR PRODUCCION
    const sftp = await conectarSFTP();

    if (!sftp || !sftp.sftp) {
      throw new Error(
        "Error de conexión SFTP: no se pudo establecer la conexión correctamente"
      );
    }
    const remoteFilePath = rutaArchivo;
    const fileBuffer = await sftp.get(remoteFilePath);
    res.send(fileBuffer);
    await sftp.end();
  } catch (error) {
    await sftp.end();
    console.error("Error al obtener archivos de un boletín:", error);
    res.status(500).json({ message: "Error al obtener archivos del boletín" });
  }
};

const construirRutaArchivo = async (idBoletin) => {
  const boletin = await obtenerDatosDelBoletin(idBoletin);
  //CAMBIAR RUTA SERVIDOR PRODUCCION
  const rutaArchivo = `/home/boletin/${boletin.fecha_publicacion
    .toISOString()
    .slice(0, 4)}/bol_${boletin.nro_boletin}_${boletin.fecha_publicacion
    .toISOString()
    .slice(0, 10)}.pdf`;

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
    await db.end();
    console.error("Error al obtener archivos de un boletín:", error);
    throw new Error("No se encontraron boletines para el ID especificado");
  }
};

const postBoletinGuardar = async (req, res) => {
  try {
    const db = await conectarMySql();
    const {id_boletin, nro_boletin, fecha_publicacion, habilita } = req.body;


    const [result] = await db.query(
      "INSERT INTO boletin id_boletin = ?, nro_boletin = ?, fecha_publicacion = ?, habilita = ? ",
      [id_boletin,nro_boletin, fecha_publicacion, habilita]
    );

    console.log('Cambios guardados correctamente:', result);

    // Puedes enviar una respuesta al frontend si lo necesitas
    res.status(200).json({ message: 'Cambios guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar cambios:', error);
    // Puedes enviar un código de error y un mensaje al frontend si lo necesitas
    res.status(500).json({ error: 'Error al guardar cambios' });
  }
};

const putBoletinesMySql = async (req, res) => {
  try {
    const db = await conectarMySql();
    console.log(req.body);
    const { id_boletin, nro_boletin, fecha_publicacion, habilita } = req.body;
    
    // Log para verificar los valores de los parámetros
    console.log('Valores de los parámetros:', id_boletin, nro_boletin, fecha_publicacion, habilita);
    
    // Ejecutar la consulta SQL
    await db.query(
      'UPDATE boletin SET nro_boletin = ?, fecha_publicacion = ?, habilita = ? WHERE id_boletin = ?',
      [nro_boletin, fecha_publicacion.slice(0, 10), habilita, id_boletin]
    );

    // Respuesta exitosa
    res.status(200).json({ message: 'Boletín actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar boletín:', error);
    res.status(500).json({ message: 'Error al actualizar boletín' });
  }
};



const postBoletin = async (req, res) => {
  try {
    const db = await conectarMySql();
    funcionMulter()(req, res, async (err) => {
      console.log(req.body, "356");
      console.log(req.file, "357");

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
      console.log(requestData);
      console.log(requestData.fechaBoletin, "f");
      console.log(requestData.nroBoletin, "e");
      console.log(requestData.fechaNormaBoletin, "d");
      console.log(requestData.nroDecreto, "c");
      console.log(requestData.nroOrdenanza, "b");
      console.log(requestData.nroResolucion, "a");
      console.log(requestData.origen, "a");

      const [result] = await db.query(
        "INSERT INTO boletin_prueba (nro_boletin, fecha_publicacion) VALUES (?, ?)",
        [requestData.nroBoletin, requestData.fechaBoletin]
      );
      const nuevoID = result.insertId;

      // const [normas] = await db.query(`SELECT * FROM norma WHERE habilita = 1`);
      // console.log(normas);

      if (requestData.nroDecreto.length > 0) {
        for (const decreto of requestData.nroDecreto) {
          const idNorma = 1;
          await db.query(
            "INSERT INTO contenido_boletin_prueba (id_boletin, id_norma, nro_norma, fecha_norma) VALUES (?, ?, ?, ?)",
            [nuevoID, idNorma, decreto, requestData.fechaNormaBoletin]
          );
        }
      }
      if (requestData.nroOrdenanza.length > 0) {
        for (const ordenanza of requestData.nroOrdenanza) {
          const idNorma = 2;

          await db.query(
            "INSERT INTO contenido_boletin_prueba (id_boletin, id_norma, nro_norma, fecha_norma) VALUES (?, ?, ?, ?)",
            [nuevoID, idNorma, ordenanza, requestData.fechaNormaBoletin]
          );
        }
      }
      if (requestData.nroResolucion.length > 0) {
        for (const resolucion of requestData.nroResolucion) {
          const idNorma = 3;

          await db.query(
            "INSERT INTO contenido_boletin_prueba (id_boletin, id_norma, nro_norma, fecha_norma) VALUES (?, ?, ?, ?)",
            [nuevoID, idNorma, resolucion, requestData.fechaNormaBoletin]
          );
        }
      }
      //VERIFICAR CREDENCIALES PARA ACCEDER A RUTA SERVIDOR PRODUCCION
      const sftp = await conectarSFTP();

      if (!sftp || !sftp.sftp) {
        throw new Error(
          "Error de conexión SFTP: no se pudo establecer la conexión correctamente"
        );
      }
      //CAMBIAR RUTA SERVIDOR PRODUCCION
      const rutaArchivo = `/home/boletin/${requestData.fechaBoletin.slice(0,4)}/bol_${requestData.nroBoletin}_${requestData.fechaBoletin.slice(0,10)}.pdf`;

      await sftp.put(req.file.path, rutaArchivo);
      await sftp.end();
      await db.end();

      console.log("El archivo se ha guardado correctamente en", rutaArchivo);
      res.status(200).json({ message: "Se agregó un nuevo Boletín con éxito" });
    });
  } catch (error) {
    await db.end();
    console.error("Error al agregar boletín:", error);
    res.status(500).json({ message: "Error al agregar Boletín" });
  }
};




module.exports = {
  postBoletin,
  getBoletinesMySql,
  getBuscarNroMySql,
  getBuscarFechaMySql,
  getBuscarNroYFechaMySql,
  getBuscarPorTipoMySql,
  getBuscarPorFechaMySql,
  getBuscarPorTodoMySql,
  obtenerArchivosDeUnBoletinMySql,
  getOrigen,
  putBoletinesMySql,postBoletin, postBoletinGuardar,getBoletinesListado,
};
