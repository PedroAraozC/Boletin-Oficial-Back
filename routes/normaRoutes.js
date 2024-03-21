const { Router } = require("express");
const { getNormas, putNormas, getNormasTodo} = require("../controllers/normasControllers");



const router = Router();

router.get("/listar", getNormas);//MySql
router.get("/listado", getNormasTodo);//MySql
router.put("/editar", putNormas);//MySql

module.exports = router;
