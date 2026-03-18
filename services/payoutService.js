const ai = require("./aiService");
const triggerService = require("./triggerService");
const fraudService = require("./fraudService");

exports.process = (worker, data) => {
  const trigger = triggerService.check(data);

  if (!trigger) {
    return {
      message: "No payout - trigger not met"
    };
  }

  const fraudScore = fraudService.getScore(worker);

  const payout = ai.calculatePayout(worker);

  let finalPayout = payout;

  if (fraudScore > 0.7) {
    finalPayout = payout * 0.5; // reduce payout
  }

  return {
    worker: worker.name,
    trigger: "Rainfall exceeded",
    fraudScore,
    payout: finalPayout,
    status: "Processed"
  };
};