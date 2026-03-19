const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workerController");

router.get("/", workerController.getWorkers);
router.get("/:id", workerController.getWorkerById);

module.exports = router;