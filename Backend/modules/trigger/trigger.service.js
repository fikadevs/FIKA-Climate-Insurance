const Trigger = require("./trigger.model");
const { getWeatherData } = require("../../integrations/weatherAPI");
const { getAQIData } = require("../../integrations/aqiAPI");
const payoutService = require("../payout/payout.service");
const Worker = require("../worker/worker.model");
const { predictFraud } = require("../../integrations/mlService");

// Create trigger
const createTrigger = async (data) => {
  return await Trigger.create(data);
};

// Get all triggers
const getTriggers = async () => {
  return await Trigger.findAll();
};

// Manual trigger check
const checkTrigger = async (zone, type, value) => {
  const trigger = await Trigger.findOne({ where: { zone, type } });

  if (!trigger) return null;

  if (value > trigger.threshold) {
    trigger.isActive = true;
    await trigger.save();
    return trigger;
  }

  return null;
};

// Weather-only trigger
const checkWeatherTrigger = async (city, zone) => {
  const weather = await getWeatherData(city);

  if (!weather) return { error: "Weather data not available" };

  const trigger = await Trigger.findOne({
    where: { zone, type: "rain" },
  });

  if (!trigger) {
    return { message: "No trigger config found", weather };
  }

  if (weather.rainfall > trigger.threshold) {
    trigger.isActive = true;
    await trigger.save();

    return {
      message: "Trigger Activated",
      weather,
      trigger,
    };
  }

  return {
    message: "No trigger activated",
    weather,
  };
};

// FULL ENVIRONMENT CHECK (FIXED)
const checkEnvironmentTrigger = async (city, zone) => {
  try {
    const weather = await getWeatherData(city);

    if (!weather || weather.error) {
      return { error: "Weather data not available" };
    }

    //  DEBUG (REMOVE LATER)
    console.log("Weather:", weather);

    //  CRITICAL FIX: validate lat/lon
    if (!weather.lat || !weather.lon) {
      return { error: "Invalid weather coordinates" };
    }

    const aqiData = await getAQIData(weather.lat, weather.lon);

    //  DEBUG
    console.log("AQI:", aqiData);

    if (!aqiData) {
      return { error: "AQI data not available" };
    }

    let rainActivated = false;
    let pollutionActivated = false;
    let payouts = [];

    //  Rain trigger
    const rainTrigger = await Trigger.findOne({
      where: { zone, type: "rain" },
    });

    if (rainTrigger && weather.rainfall > rainTrigger.threshold) {
      rainActivated = true;

      const workers = await Worker.findAll({ where: { zone } });

      for (let worker of workers) {
  // 🔥 ML Fraud Check
  const fraudResult = await predictFraud({
    claim_amount: worker.weeklyIncome,
    frequency: 1,
    location_risk: 0.5,
  });

  // 🚫 Block fraud
  if (fraudResult && fraudResult.fraud) {
    console.log(`⚠️ Fraud detected for worker ${worker.id}`);
    continue;
  }

  const payout = await payoutService.createAutoPayout(
    worker.id,
    "rain"
  );

  payouts.push(payout);
}
    }

    //  Pollution trigger
    if (aqiData.aqi >= 4) {
      pollutionActivated = true;

      const workers = await Worker.findAll({ where: { zone } });

      for (let worker of workers) {
  const fraudResult = await predictFraud({
    claim_amount: worker.weeklyIncome,
    frequency: 1,
    location_risk: 0.7,
  });

  if (fraudResult && fraudResult.fraud) {
    console.log(`⚠️ Fraud detected for worker ${worker.id}`);
    continue;
  }

  const payout = await payoutService.createAutoPayout(
    worker.id,
    "pollution"
  );

  payouts.push(payout);
}
    }

    return {
      message: "Environment checked",
      weather,
      aqi: aqiData,
      triggers: {
        rain: rainActivated,
        pollution: pollutionActivated,
      },
      payouts,
    };
  } catch (error) {
    console.error("Environment Error:", error.message);
    return { error: "Internal server error" };
  }
};

module.exports = {
  createTrigger,
  getTriggers,
  checkTrigger,
  checkWeatherTrigger,
  checkEnvironmentTrigger,
};