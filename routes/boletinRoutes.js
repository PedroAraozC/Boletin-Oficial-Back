const { Router } = require("express");
const { funcionMulter } = require("../middlewares/multerStorage");
const {
  agregarBoletin,
  getBoletin,
  getBuscar,
  getBuscarFecha,
  getBuscarDecreto,
  getBuscarOrdenanza,
  getBuscarResolucion,
  getBuscarNroYFecha,
  obtenerArchivosDeUnBoletin,
  getBuscarPorTipo
} = require("../controllers/boletinesControllers");

const router = Router();

router.get("/listar", getBoletin);
router.get("/listarDescarga/:id?", obtenerArchivosDeUnBoletin);
router.get("/buscar/:nroBoletin", getBuscar);
router.get("/buscarFecha/:fechaBoletin", getBuscarFecha);
// router.get("/buscarDecreto/:nroDecreto", getBuscarDecreto);
// router.get("/buscarOrdenanza/:nroOrdenanza", getBuscarOrdenanza);
// router.get("/buscarResolucion/:nroResolucion", getBuscarResolucion);
router.get("/buscarNroYFecha/:nroBoletin/:fechaBoletin", getBuscarNroYFecha);
router.get("/buscarPorTipo/:tipo/:parametro", getBuscarPorTipo);

router.post("/alta", agregarBoletin);
router.post("/subir-archivo", funcionMulter);

module.exports = router;
