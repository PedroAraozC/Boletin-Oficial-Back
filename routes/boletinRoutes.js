const { Router } = require("express");
const {funcionMulter} = require ("../middlewares/multerStorage")
const {
  agregarBoletin,
  getBoletin,
} = require("../controllers/boletinesControllers");

const router = Router();

router.post("/alta",  agregarBoletin);
router.get("/listar", getBoletin);
router.post("/subir-archivo", funcionMulter);
module.exports = router;
