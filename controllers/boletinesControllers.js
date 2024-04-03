const CustomError = require("../utils/customError");
const { conectarMySql } = require("../config/dbMySql");
const { conectarSFTP } = require("../config/dbwinscp");
const { funcionMulter } = require("../middlewares/multerStorage");

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
    const [boletines] = await db.query("SELECT * FROM boletin");
    res.json(boletines);
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar boletines:", error);
    res.status(500).json({ message: "Error al buscar boletines en listado" });
  }
};

const getBoletinesContenidoListado = async (req, res) => {
  try {
    const db = await conectarMySql();
    const [contenidoBoletines] = await db.query(
      "SELECT * FROM contenido_boletin WHERE habilita = 1"
    );
    res.json(contenidoBoletines);
    await db.end();
  } catch (error) {
    await db.end();
    console.error("Error al buscar boletines:", error);
    res.status(500).json({ message: "Error al buscar boletines en listado" });
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
  const { idNorma, parametro } = req.params;
  let boletines = [];
  try {
    const db = await conectarMySql();
    const [norma] = await db.query(
      `SELECT tipo_norma FROM norma WHERE id_norma = ${idNorma}`
    );

    if (!norma) {
      throw new CustomError("ID de norma no válido", 400);
    }

    let query = `
      SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
      FROM contenido_boletin cb
      JOIN boletin b ON cb.id_boletin = b.id_boletin
      WHERE cb.id_norma = ?
      AND b.habilita = 1
    `;

    if (parametro && parametro !== "undefined" && parametro !== "") {
      query += ` AND cb.nro_norma = '${parametro}'`;
    }

    const [result] = await db.query(query, [idNorma]);
    boletines = result;

    res.json(boletines);
    await db.end();
  } catch (error) {
    console.error("Error al buscar boletines: ", error);
    res.status(500).json({ message: "Error al buscar boletines" });
  }
};

const getBuscarPorFechaMySql = async (req, res) => {
  const { fecha, idNorma } = req.params;
  let boletines = [];
  try {
    if (!fecha && (!idNorma || idNorma === "undefined" || idNorma === "")) {
      throw new CustomError("Fecha o ID de norma no válidos", 400);
    }

    const db = await conectarMySql();
    let query = `
      SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
      FROM contenido_boletin cb
      JOIN boletin b ON cb.id_boletin = b.id_boletin
      WHERE b.habilita = 1
    `;

    if (fecha && fecha !== "undefined" && fecha !== "") {
      query += ` AND cb.fecha_norma = '${fecha}'`;
    }

    if (idNorma && idNorma !== "undefined" && idNorma !== "") {
      query += ` AND cb.id_norma = ?`;
    }

    let params = [];
    if (idNorma && idNorma !== "undefined" && idNorma !== "") {
      params.push(idNorma);
    }

    const [result] = await db.query(query, params);
    boletines = result;

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

    if (
      (!tipo || tipo === "undefined" || tipo === "") &&
      (!fecha || fecha === "undefined" || fecha === "") &&
      (!nroNorma || nroNorma === "undefined" || nroNorma === "")
    ) {
      throw new CustomError("Parámetros de búsqueda no válidos", 400);
    }

    let query = `
      SELECT DISTINCT b.id_boletin, b.nro_boletin, b.fecha_publicacion
      FROM contenido_boletin cb
      JOIN boletin b ON cb.id_boletin = b.id_boletin
      WHERE b.habilita = 1
    `;

    if (tipo && tipo !== "undefined" && tipo !== "") {
      query += ` AND cb.id_norma = ?`;
    }

    if (fecha && fecha !== "undefined" && fecha !== "") {
      query += ` AND cb.fecha_norma = ?`;
    }

    if (nroNorma && nroNorma !== "undefined" && nroNorma !== "") {
      query += ` AND cb.nro_norma = ?`;
    }

    let params = [];
    if (tipo && tipo !== "undefined" && tipo !== "") {
      params.push(tipo);
    }

    if (fecha && fecha !== "undefined" && fecha !== "") {
      params.push(fecha);
    }

    if (nroNorma && nroNorma !== "undefined" && nroNorma !== "") {
      params.push(nroNorma);
    }

    const [result] = await db.query(query, params);
    boletines = result;

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


const putBoletinesMySql = async (req, res) => {
  try {
    const db = await conectarMySql();
    const {
      id_boletin,
      nro_boletin,
      fecha_publicacion,
      habilita,
      normasAgregadasEditar,
    } = req.body;

    await db.query(
      "UPDATE boletin SET nro_boletin = ?, fecha_publicacion = ?, habilita = ? WHERE id_boletin = ?",
      [nro_boletin, fecha_publicacion.slice(0, 10), habilita, id_boletin]
    );

    for (const contenido of normasAgregadasEditar) {
      const { norma, numero, origen, año, habilita, id_contenido_boletin } =
        contenido;
      if (id_contenido_boletin > 0) {
        await db.query(
          "UPDATE contenido_boletin SET id_norma = ?, nro_norma = ?, id_origen = ?, fecha_norma = ?, habilita = ? WHERE id_contenido_boletin = ? AND id_boletin = ?",
          [
            norma,
            numero,
            origen,
            año.slice(0, 10),
            habilita,
            id_contenido_boletin,
            id_boletin,
          ]
        );
      } else if (id_contenido_boletin < 0) {
        await db.query(
          "INSERT INTO contenido_boletin (id_boletin, id_norma, nro_norma, id_origen, fecha_norma) VALUES (?,?,?,?,?)",
          [id_boletin, norma, numero, origen, año.slice(0, 10)]
        );
      }
    }
    res.status(200).json({ message: "Boletín actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar boletín:", error);
    res.status(500).json({ message: "Error al actualizar boletín" });
  }
};

const postBoletin = async (req, res) => {
  try {
    const db = await conectarMySql();
    funcionMulter()(req, res, async (err) => {
      if (!req.file) {
        throw new CustomError("Error al cargar el archivo", 400);
      }
      let requestData = "";

      if (req.body.requestData === undefined) {
        requestData = JSON.parse(req.body.requestData[1]);
      } else {
        requestData = JSON.parse(req.body.requestData);
      }

      const [result] = await db.query(
        "INSERT INTO boletin (nro_boletin, fecha_publicacion, habilita) VALUES (?, ?, ?)",
        [
          requestData.nroBoletin,
          requestData.fechaPublicacion,
          requestData.habilita,
        ]
      );
      const nuevoID = result.insertId;

      // const [normas] = await db.query(`SELECT * FROM norma WHERE habilita = 1`);

      for (const contenido of requestData.arrayContenido) {
        const { norma, numero, origen, año } = contenido;
        const idNorma = norma.id_norma;
        const idOrigen = origen.id_origen;
        await db.query(
          "INSERT INTO contenido_boletin (id_boletin, id_norma, nro_norma, id_origen, fecha_norma) VALUES (?,?,?,?,?)",
          [nuevoID, idNorma, numero, idOrigen, año]
        );
      }

      // VERIFICAR CREDENCIALES PARA ACCEDER A RUTA SERVIDOR PRODUCCION
      
      const sftp = await conectarSFTP();

      if (!sftp || !sftp.sftp) {
        throw new Error(
          "Error de conexión SFTP: no se pudo establecer la conexión correctamente"
        );
      }
     
      //CAMBIAR RUTA SERVIDOR PRODUCCION
      //RUTA PC PEDRO
      // const rutaArchivo = `C:\\Users\\Programadores\\Desktop\\${requestData.fechaPublicacion.slice(
      //   0,
      //   4
      // )}/bol_${requestData.nroBoletin}_${requestData.fechaPublicacion.slice(
      //   0,
      //   10
      // )}.pdf`;
     
      //RUTA SERVIDOR DESARROLLO (172.16.8.209)
     
      const rutaArchivo = `/home/boletin/${requestData.fechaPublicacion.slice(
        0,
        4
      )}/bol_${requestData.nroBoletin}_${requestData.fechaPublicacion.slice(
        0,
        10
      )}.pdf`;

      await sftp.put(req.file.path, rutaArchivo);
      await sftp.end();
      await db.end();

      // console.log("El archivo se ha guardado correctamente en", rutaArchivo);
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
  putBoletinesMySql,
  getBoletinesMySql,
  getBuscarNroMySql,
  getBoletinesListado,
  getBuscarFechaMySql,
  getBuscarPorTodoMySql,
  getBuscarPorTipoMySql,
  getBuscarPorFechaMySql,
  getBuscarNroYFechaMySql,
  getBoletinesContenidoListado,
  obtenerArchivosDeUnBoletinMySql,
};
