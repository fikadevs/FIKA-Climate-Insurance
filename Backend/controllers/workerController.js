const data = require("../data/data.json");

exports.getWorkers = (req, res) => {
  res.json(data.workers);
};

exports.getWorkerById = (req, res) => {
  const id = parseInt(req.params.id);
  const worker = data.workers.find(w => w.id === id);

  if (!worker) {
    return res.status(404).json({ message: "Worker not found" });
  }

  res.json(worker);
};