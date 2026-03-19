exports.check = (data) => {
  return data.triggers.rainfall > data.triggers.threshold;
};