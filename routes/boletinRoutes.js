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
<<<<<<< HEAD
  obtenerArchivosDeUnBoletinMySql,
=======
  obtenerArchivosDeUnBoletinMySql,putBoletinesMySql, postBoletinGuardar, getBoletinesListado, getContenido,putContenido,
>>>>>>> 0205cb8bd0b1af5db50c1c5c22fc5575c91713a1
} = require("../controllers/boletinesControllers");

const router = Router();

router.get("/listar", getBoletinesMySql); //MySql
<<<<<<< HEAD
=======
router.get("/listado", getBoletinesListado); //MySql
>>>>>>> 0205cb8bd0b1af5db50c1c5c22fc5575c91713a1
router.get("/buscar/:nroBoletin", getBuscarNroMySql); //MySql
router.get("/buscarFecha/:fechaBoletin", getBuscarFechaMySql); //MySql
router.get("/listarDescarga/:id?", obtenerArchivosDeUnBoletinMySql); //MySql
router.get(
  "/buscarNroYFecha/:nroBoletin/:fechaBoletin",
  getBuscarNroYFechaMySql
); //MySql
<<<<<<< HEAD
=======
router.get("/listarContenido", getContenido); //MySql

>>>>>>> 0205cb8bd0b1af5db50c1c5c22fc5575c91713a1
router.get("/buscarPorFecha/:fecha/:tipo", getBuscarPorFechaMySql); //MySql
router.get("/buscarPorTipo/:tipo/:parametro", getBuscarPorTipoMySql); //MySql
router.get("/buscarPorTodo/:fecha/:tipo/:nroNorma", getBuscarPorTodoMySql); //MySql
router.get("/listarOrigen", getOrigen);

router.post("/alta", postBoletin); //MySql
router.post("/subir-archivo", funcionMulter);
<<<<<<< HEAD
=======
router.post("/guardar", postBoletinGuardar);
router.put("/editar", putBoletinesMySql);
router.put("/traer", putContenido);
>>>>>>> 0205cb8bd0b1af5db50c1c5c22fc5575c91713a1

module.exports = router;
