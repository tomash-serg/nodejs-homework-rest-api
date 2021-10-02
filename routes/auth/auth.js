const router = require("express").Router();
const { validation, controller } = require("../../middlewares");
const { JoiSchemaUser } = require("../../models");
const { auth } = require("../../cotrollers");

router.post("/signup", validation(JoiSchemaUser), controller(auth.signup));
router.post("/login", validation(JoiSchemaUser), controller(auth.login));
router.post("/logout", controller(auth.logout));
router.post("/current", controller(auth.current));

module.exports = router;
