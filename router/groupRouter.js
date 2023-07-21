const express = require("express");
const router = express.Router();
const groupController = require("../controller/groupController");
const Authentication = require("../middleware/auth");

router.post("/createGroup", Authentication, groupController.createGroup);
router.post("/addToGroup", Authentication, groupController.addToGroup);
router.get("/getGroups", Authentication, groupController.getGroups);
router.post("/deleteFromGroup", Authentication, groupController.deleteFromGroup);
router.get("/groupMembers/:groupName", Authentication, groupController.groupMembers);

module.exports = router;