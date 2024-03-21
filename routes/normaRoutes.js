const { Router } = require("express");
<<<<<<< HEAD
const { getNormas } = require("../controllers/normasControllers");
=======
const { getNormas, putNormas, getNormasTodo} = require("../controllers/normasControllers");


>>>>>>> 0205cb8bd0b1af5db50c1c5c22fc5575c91713a1

const router = Router();

router.get("/listar", getNormas);//MySql
<<<<<<< HEAD
=======
router.get("/listado", getNormasTodo);//MySql
router.put("/editar", putNormas);//MySql
>>>>>>> 0205cb8bd0b1af5db50c1c5c22fc5575c91713a1

module.exports = router;
