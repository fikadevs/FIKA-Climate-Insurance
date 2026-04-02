const service = require("./trigger.service");

// Create trigger
const createTrigger = async (req, res) => {
  try {
    const trigger = await service.createTrigger(req.body);
    res.status(201).json(trigger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all triggers
const getTriggers = async (req, res) => {
  try {
    const data = await service.getTriggers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Environment check
const checkEnvironment = async (req, res) => {
  try {
    const { city, zone } = req.query;

    const result = await service.checkEnvironmentTrigger(city, zone);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Weather-only check (FIXED)
const checkWeather = async (req, res) => {
  try {
    const { city, zone } = req.query;

    const result = await service.checkWeatherTrigger(city, zone);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTrigger,
  getTriggers,
  checkEnvironment,
  checkWeather, //  now defined
};