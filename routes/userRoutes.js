const { Router } = require("express");
const auth = require("../middlewares/auth");
const { getAuthStatus } = require("../controllers/userControllers");

const router = Router();

router.get("/authStatus", auth, getAuthStatus);
module.exports = router;
