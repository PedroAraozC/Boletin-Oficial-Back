const { Router } = require("express");
const { funcionMulter } = require("../middlewares/multerStorage");
const {
  agregarBoletin,
  getBoletin,
  getBuscar,
  obtenerArchivosDeUnBoletin,
  getBuscarFecha,
  getBuscarNroYFecha,
  getBuscarPorTipo,
  getBuscarPorFecha,
  getBuscarPorTodo,
  getBoletinesMysql
} = require("../controllers/boletinesControllers");

const router = Router();

// router.get("/listar", getBoletin);
router.get("/listar", getBoletinesMysql);
router.get("/listarDescarga/:id?", obtenerArchivosDeUnBoletin);
router.get("/buscar/:nroBoletin", getBuscar);
router.get("/buscarFecha/:fechaBoletin", getBuscarFecha);
router.get("/buscarNroYFecha/:nroBoletin/:fechaBoletin", getBuscarNroYFecha);
router.get("/buscarPorTipo/:tipo/:parametro", getBuscarPorTipo);
router.get("/buscarPorFecha/:fecha/:tipo", getBuscarPorFecha);
router.get("/buscarPorTodo/:fecha/:tipo/:nroNorma", getBuscarPorTodo);

router.post("/alta", agregarBoletin);
router.post("/subir-archivo", funcionMulter);

module.exports = router;

// router.get("/buscarDecreto/:nroDecreto", getBuscarDecreto);
// router.get("/buscarOrdenanza/:nroOrdenanza", getBuscarOrdenanza);
// router.get("/buscarResolucion/:nroResolucion", getBuscarResolucion);