const { Router } = require("express");
const { getNormas, putNormasListado, getNormasListado, postNorma} = require("../controllers/normasControllers");



const router = Router();

router.get("/listar", getNormas);//MySql
router.get("/listado", getNormasListado);//MySql
router.put("/editar", putNormasListado);//MySql
router.post("/alta", postNorma);//MySql

module.exports = router;
