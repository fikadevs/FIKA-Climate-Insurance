const router = require("express").Router();
const controller = require("./fraud.controller");

router.post("/", controller.createFraud);
router.get("/", controller.getFrauds);

module.exports = router;