const express = require("express");
const router = express.Router();

const homePageController = require("../controller/homePageController");

router.get("/", homePageController.getHomePage);

module.exports = router;