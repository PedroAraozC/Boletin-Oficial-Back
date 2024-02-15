const { Router } = require("express");
const multerStorage = require ("../middlewares/multerStorage")
const {
  agregarBoletin,
  getBoletin,
} = require("../controllers/boletinesControllers");

const router = Router();

router.post("/alta",  agregarBoletin);
router.get("/listar", getBoletin);

module.exports = router;
