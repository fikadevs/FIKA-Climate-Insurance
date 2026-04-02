const service = require("./payout.service");

const createPayout = async (req, res) => {
  try {
    const payout = await service.createPayout(req.body);
    res.status(201).json(payout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPayouts = async (req, res) => {
  try {
    const payouts = await service.getPayouts();
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPayout, getPayouts };