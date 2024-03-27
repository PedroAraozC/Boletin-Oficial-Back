const { Router } = require("express");
const { getOrigenTodo, putOrigenListado, postOrigen } = require("../controllers/origenControllers");


const router = Router();

// router.get("/listar", getOrigen);//MySql
router.get("/listado", getOrigenTodo);//MySql
router.put("/editar", putOrigenListado);//MySql
router.post("/alta", postOrigen);

module.exports = router;
