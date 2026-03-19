exports.calculateIncomeLoss = (worker) => {
  return worker.weeklyIncome - worker.currentIncome;
};

exports.calculatePayout = (worker) => {
  const loss = worker.weeklyIncome - worker.currentIncome;
  return Math.max(loss * 0.6, 0); // 60% compensation
};