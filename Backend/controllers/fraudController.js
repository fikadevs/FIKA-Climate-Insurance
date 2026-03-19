const data = require("../data/data.json");
const fraudService = require("../services/fraudService");

exports.checkFraud = (req, res) => {
  const worker = data.workers[0];

  const score = fraudService.getScore(worker);

  res.json({
    worker: worker.name,
    fraudScore: score,
    status: score > 0.7 ? "HIGH RISK" : "SAFE"
  });
};