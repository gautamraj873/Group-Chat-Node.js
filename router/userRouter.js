const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/", userController.getLoginPage);
router.post("/signUp", userController.postUserSignUp);

module.exports = router;