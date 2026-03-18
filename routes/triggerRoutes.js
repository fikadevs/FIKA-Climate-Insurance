const express = require("express");
const router = express.Router();
const triggerController = require("../controllers/triggerController");

router.get("/", triggerController.checkTrigger);

module.exports = router;