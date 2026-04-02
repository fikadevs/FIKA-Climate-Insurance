const router = require("express").Router();
const controller = require("./subscription.controller");

router.post("/", controller.createSubscription);
router.get("/", controller.getSubscriptions);

module.exports = router;