const Fraud = require("./fraud.model");

const createFraudRecord = async (data) => {
  return await Fraud.create(data);
};

const getFraudRecords = async () => {
  return await Fraud.findAll();
};

module.exports = {
  createFraudRecord,
  getFraudRecords,
};