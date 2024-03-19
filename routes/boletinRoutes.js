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
  obtenerArchivosDeUnBoletinMySql,putBoletinesMySql, postBoletinGuardar, getBoletinesListado, getContenido,putContenido,
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
router.get("/listarContenido", getContenido); //MySql

router.get("/buscarPorFecha/:fecha/:tipo", getBuscarPorFechaMySql); //MySql
router.get("/buscarPorTipo/:tipo/:parametro", getBuscarPorTipoMySql); //MySql
router.get("/buscarPorTodo/:fecha/:tipo/:nroNorma", getBuscarPorTodoMySql); //MySql
router.get("/listarOrigen", getOrigen);

router.post("/alta", postBoletin); //MySql
router.post("/subir-archivo", funcionMulter);
router.post("/guardar", postBoletinGuardar);
router.put("/editar", putBoletinesMySql);
router.put("/traer", putContenido);

module.exports = router;
