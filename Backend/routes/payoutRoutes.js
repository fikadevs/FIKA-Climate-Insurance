const express = require("express");
const router = express.Router();
const payoutController = require("../controllers/payoutController");

router.get("/", payoutController.processPayout);

module.exports = router;