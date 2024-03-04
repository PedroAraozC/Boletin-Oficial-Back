const { Router } = require("express");
const { funcionMulter } = require("../middlewares/multerStorage");
const {
  agregarBoletin,
  obtenerArchivosDeUnBoletin,
  getBoletinesMySql,
  getBuscarNroMySql,
  getBuscarFechaMySql,
  getBuscarNroYFechaMySql,
  getBuscarPorTipoMySql,
  getBuscarPorFechaMySql,
  getBuscarPorTodoMySql,
  obtenerArchivosDeUnBoletinMySql,
  // getBoletin,
  // getBuscar,
  // getBuscarFecha,
  // getBuscarNroYFecha,
  // getBuscarPorTipo,
  // getBuscarPorFecha,
  // getBuscarPorTodo,
} = require("../controllers/boletinesControllers");

const router = Router();

router.get("/listar", getBoletinesMySql);                                             //MySql
// router.get("/listarDescarga/:id?", obtenerArchivosDeUnBoletin);                    //mongo
router.get("/listarDescarga/:id?", obtenerArchivosDeUnBoletinMySql);                  //MySql
router.get("/buscar/:nroBoletin", getBuscarNroMySql);                                 //MySql
router.get("/buscarFecha/:fechaBoletin", getBuscarFechaMySql);                        //MySql
router.get(
  "/buscarNroYFecha/:nroBoletin/:fechaBoletin",
  getBuscarNroYFechaMySql
);                                                                                    //MySql
router.get("/buscarPorTipo/:tipo/:parametro", getBuscarPorTipoMySql);                 //MySql
router.get("/buscarPorFecha/:fecha/:tipo", getBuscarPorFechaMySql);                   //MySql
router.get("/buscarPorTodo/:fecha/:tipo/:nroNorma", getBuscarPorTodoMySql);           //MySql
// router.get("/listar", getBoletin);                                                 //mongo
// router.get("/buscar/:nroBoletin", getBuscar);                                      //mongo
// router.get("/buscarFecha/:fechaBoletin", getBuscarFecha);                          //mongo
// router.get("/buscarNroYFecha/:nroBoletin/:fechaBoletin", getBuscarNroYFecha);      //mongo
// router.get("/buscarPorTipo/:tipo/:parametro", getBuscarPorTipo);                   //mongo
// router.get("/buscarPorFecha/:fecha/:tipo", getBuscarPorFecha);                     //mongo
// router.get("/buscarPorTodo/:fecha/:tipo/:nroNorma", getBuscarPorTodo);             //mongo

router.post("/alta", agregarBoletin);
router.post("/subir-archivo", funcionMulter);

module.exports = router;

// router.get("/buscarDecreto/:nroDecreto", getBuscarDecreto);
// router.get("/buscarOrdenanza/:nroOrdenanza", getBuscarOrdenanza);
// router.get("/buscarResolucion/:nroResolucion", getBuscarResolucion);
