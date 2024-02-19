const { Router } = require("express");
const { funcionMulter } = require("../middlewares/multerStorage");
const {
  agregarBoletin,
  getBoletin,
  obtenerArchivosDeUnBoletin,
} = require("../controllers/boletinesControllers");

const router = Router();

router.get("/listar", getBoletin);
router.get("/listarDescarga/:id?", obtenerArchivosDeUnBoletin);

router.post("/alta", agregarBoletin);
router.post("/subir-archivo", funcionMulter);

module.exports = router;
