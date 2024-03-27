const { Router } = require("express");
const {
  getOrigen,
  getOrigenTodo,
  postOrigen,
  putOrigenListado,
} = require("../controllers/origenControllers");

const router = Router();

router.get("/listar", getOrigen);
router.get("/listado", getOrigenTodo);

router.post("/alta", postOrigen);

router.put("/editar", putOrigenListado);

module.exports = router;
