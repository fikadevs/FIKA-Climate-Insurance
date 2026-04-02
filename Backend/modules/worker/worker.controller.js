const workerService = require("./worker.service");

const getWorkers = async (req, res) => {
  try {
    const workers = await workerService.getAllWorkers();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createWorker = async (req, res) => {
  try {
    const worker = await workerService.createWorker(req.body);
    res.status(201).json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getWorkers,
  createWorker,
};