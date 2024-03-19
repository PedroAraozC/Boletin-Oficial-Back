const { Router } = require("express");
const { funcionMulter } = require("../middlewares/multerStorage");
const {
  postBoletin,
  // postBoletinGuardar,
  putBoletinesMySql,
  getOrigen,
  getBoletinesMySql,
  getBuscarNroMySql,
  getBuscarFechaMySql,
  getBoletinesListado,
  getBuscarPorTodoMySql,
  getBuscarPorTipoMySql,
  getBuscarPorFechaMySql,
  getBuscarNroYFechaMySql,
  obtenerArchivosDeUnBoletinMySql,
} = require("../controllers/boletinesControllers");

const router = Router();

router.get("/listar", getBoletinesMySql); //MySql
router.get("/listado", getBoletinesListado); //MySql
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
router.post("/subir-archivo", funcionMulter); //MySql
// router.post("/guardar", postBoletinGuardar); //MySql
router.put("/editar", putBoletinesMySql); //MySql

module.exports = router;
