const { Router } = require("express");
const { funcionMulter } = require("../middlewares/multerStorage");
const {
  getOrigen,
  postBoletin,
  getBoletinesMySql,
  getBuscarNroMySql,
  getBuscarFechaMySql,
  getBuscarPorTipoMySql,
  getBuscarPorTodoMySql,
  getBuscarPorFechaMySql,
  getBuscarNroYFechaMySql,
  obtenerArchivosDeUnBoletinMySql,
} = require("../controllers/boletinesControllers");

const router = Router();

router.get("/listar", getBoletinesMySql); //MySql
router.get("/buscar/:nroBoletin", getBuscarNroMySql); //MySql
router.get("/buscarFecha/:fechaBoletin", getBuscarFechaMySql); //MySql
router.get("/listarDescarga/:id?", obtenerArchivosDeUnBoletinMySql); //MySql
router.get(
  "/buscarNroYFecha/:nroBoletin/:fechaBoletin",
  getBuscarNroYFechaMySql
); //MySql
router.get("/buscarPorFecha/:fecha/:idNorma", getBuscarPorFechaMySql); //MySql
router.get("/buscarPorTipo/:idNorma/:parametro", getBuscarPorTipoMySql); //MySql
router.get("/buscarPorTodo/:fecha/:tipo/:nroNorma", getBuscarPorTodoMySql); //MySql
router.get("/listarOrigen", getOrigen);

router.post("/alta", postBoletin); //MySql
router.post("/subir-archivo", funcionMulter);

module.exports = router;
