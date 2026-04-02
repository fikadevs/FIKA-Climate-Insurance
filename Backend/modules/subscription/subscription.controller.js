const service = require("./subscription.service");

const createSubscription = async (req, res) => {
  try {
    const sub = await service.createSubscription(req.body);
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    const data = await service.getSubscriptions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
};