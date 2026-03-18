const data = require("../data/data.json");
const payoutService = require("../services/payoutService");

exports.processPayout = (req, res) => {
  const worker = data.workers[0];

  const result = payoutService.process(worker, data);

  res.json(result);
};