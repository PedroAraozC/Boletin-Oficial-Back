const { Router } = require("express");
const { funcionMulter } = require("../middlewares/multerStorage");
const {
  postBoletin,
  putBoletinesMySql,
  getBoletinesMySql,
  getBuscarNroMySql,
  getBuscarFechaMySql,
  getBoletinesListado,
  getBuscarPorTodoMySql,
  getBuscarPorTipoMySql,
  getBuscarPorFechaMySql,
  getBuscarNroYFechaMySql,
  getBoletinesContenidoListado,
  obtenerArchivosDeUnBoletinMySql,
} = require("../controllers/boletinesControllers");

const router = Router();

router.get("/listar", getBoletinesMySql); 

router.get("/listado", getBoletinesListado); 
router.get("/listadoContenido", getBoletinesContenidoListado); 
router.get("/buscar/:nroBoletin", getBuscarNroMySql); 
router.get("/buscarFecha/:fechaBoletin", getBuscarFechaMySql); 
router.get("/listarDescarga/:id?", obtenerArchivosDeUnBoletinMySql); 
router.get(
  "/buscarNroYFecha/:nroBoletin/:fechaBoletin",
  getBuscarNroYFechaMySql
); 
router.get("/buscarPorFecha/:fecha/:idNorma", getBuscarPorFechaMySql); 
router.get("/buscarPorTipo/:idNorma/:parametro", getBuscarPorTipoMySql); 
router.get("/buscarPorTodo/:fecha/:tipo/:nroNorma", getBuscarPorTodoMySql); 

router.post("/alta", postBoletin); 
router.post("/subir-archivo", funcionMulter); 

router.put("/editar", putBoletinesMySql); 

module.exports = router;
