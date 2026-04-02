const router = require("express").Router();
const controller = require("./payout.controller");

router.post("/", controller.createPayout);
router.get("/", controller.getPayouts);

module.exports = router;