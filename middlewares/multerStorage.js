// const express = require('express');
// const router = express.Router();
const multer = require('multer');
// const { agregarBoletin } = require('../controllers/boletinController');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  }
});
const upload = multer({ storage: storage });


module.exports = upload;
