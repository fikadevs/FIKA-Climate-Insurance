const express = require("express");
const router = express.Router();

const controller = require("./worker.controller");
const {
  createWorkerSchema,
  validate,
} = require("./worker.validation");

// Apply validation middleware
router.post("/", validate(createWorkerSchema), controller.createWorker);

router.get("/", controller.getWorkers);

module.exports = router;