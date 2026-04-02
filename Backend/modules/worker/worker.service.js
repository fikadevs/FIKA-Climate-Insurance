const Worker = require("./worker.model");

const getAllWorkers = async () => {
  return await Worker.findAll();
};

const createWorker = async (data) => {
  return await Worker.create(data);
};

module.exports = {
  getAllWorkers,
  createWorker,
};