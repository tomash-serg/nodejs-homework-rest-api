const router = require("express").Router();
const { validation, controller, authorization } = require("../../middlewares");
const { JoiSchemaUser } = require("../../models");
const { auth } = require("../../cotrollers");

router.post("/signup", validation(JoiSchemaUser), controller(auth.signup));
router.post("/login", validation(JoiSchemaUser), controller(auth.login));
router.get("/logout", authorization(), controller(auth.logout));

module.exports = router;
