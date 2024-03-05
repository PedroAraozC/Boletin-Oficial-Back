const { Router } = require("express");
const { getNormas } = require("../controllers/normasControllers");


const router = Router();

router.get("/listar", getNormas);//MySql

module.exports = router;
