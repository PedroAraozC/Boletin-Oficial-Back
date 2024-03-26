const { Router } = require("express");
const { getOrigenTodo } = require("../controllers/origenControllers");


const router = Router();

// router.get("/listar", getOrigen);//MySql
router.get("/listado", getOrigenTodo);//MySql
// router.put("/editar", putOrigen);//MySql

module.exports = router;
