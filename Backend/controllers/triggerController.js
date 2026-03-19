const data = require("../data/data.json");
const triggerService = require("../services/triggerService");

exports.checkTrigger = (req, res) => {
  const triggered = triggerService.check(data);

  res.json({
    triggered,
    rainfall: data.triggers.rainfall,
    threshold: data.triggers.threshold
  });
};