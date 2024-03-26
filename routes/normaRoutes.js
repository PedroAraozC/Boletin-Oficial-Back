const { Router } = require("express");
const { getNormas, putNormasListado, getNormasListado} = require("../controllers/normasControllers");



const router = Router();

router.get("/listar", getNormas);//MySql
router.get("/listado", getNormasListado);//MySql
router.put("/editar", putNormasListado);//MySql

module.exports = router;
