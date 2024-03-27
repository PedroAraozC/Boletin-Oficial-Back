const { Router } = require("express");
const { getOrigenTodo, putOrigenListado } = require("../controllers/origenControllers");


const router = Router();

// router.get("/listar", getOrigen);//MySql
router.get("/listado", getOrigenTodo);//MySql
router.put("/editar", putOrigenListado);//MySql

module.exports = router;
