const { Router } = require("express");
const { getNormas, putNormasListado, getNormasListado, postNorma} = require("../controllers/normasControllers");

const router = Router();

router.get("/listar", getNormas);
router.get("/listado", getNormasListado);

router.put("/editar", putNormasListado);

router.post("/alta", postNorma);

module.exports = router;
