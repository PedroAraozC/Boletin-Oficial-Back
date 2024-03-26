const multer = require("multer");
const path = require("path");
const fs = require("fs");

const funcionMulter = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, "..", "uploads", "boletin");
      fs.mkdirSync(uploadPath, { recursive: true }); // Crear carpeta si no existe
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const boletin = JSON.parse(req.body.requestData);

      if (!boletin.nroBoletin || !boletin.fechaPublicacion) {
        return cb(
          new Error("Falta información para construir el nombre del archivo")
        );
      }
      const nombreArchivo = `bol_${boletin.nroBoletin}_${boletin.fechaPublicacion}.pdf`;
      cb(null, nombreArchivo);
    },
  });

  const upload = multer({ storage: storage });

  return upload.single("archivoBoletin"); // Cambio aquí para aceptar un solo archivo
};

module.exports = { funcionMulter };
