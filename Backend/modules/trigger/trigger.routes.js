const router = require("express").Router();
const controller = require("./trigger.controller");


// Existing routes
router.post("/", controller.createTrigger);
router.get("/", controller.getTriggers);
router.get("/check-environment", controller.checkEnvironment);
//  NEW route
router.get("/check-weather", controller.checkWeather);

module.exports = router;