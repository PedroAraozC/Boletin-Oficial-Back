const multer = require("multer");
const fs = require('fs');

const funcionMulter = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `../archivosBoletin`; // Ruta de la carpeta de destino
      fs.mkdirSync(uploadPath, { recursive: true }); // Crear carpeta si no existe
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  return upload.single("archivoBoletin"); // Cambio aquí para aceptar un solo archivo
};

module.exports = {funcionMulter}; // Exporta la función directamente
