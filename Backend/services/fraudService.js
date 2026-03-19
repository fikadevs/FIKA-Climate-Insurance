exports.getScore = (worker) => {
  let score = 0;

  if (worker.currentIncome === 0) score += 0.5;
  if (worker.zone === "Unknown") score += 0.4;
  if (worker.weeklyIncome < 1000) score += 0.2;

  return Math.min(score, 1);
};