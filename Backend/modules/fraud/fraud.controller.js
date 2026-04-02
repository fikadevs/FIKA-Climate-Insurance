const service = require("./fraud.service");

const createFraud = async (req, res) => {
  try {
    const record = await service.createFraudRecord(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFrauds = async (req, res) => {
  const data = await service.getFraudRecords();
  res.json(data);
};

module.exports = { createFraud, getFrauds };