const workerService = require("./worker.service");
const Worker = require("./worker.model"); // <--- Added this to talk to the DB for alerts!

const getWorkers = async (req, res) => {
  try {
    const workers = await workerService.getAllWorkers();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createWorker = async (req, res) => {
  try {
    const worker = await workerService.createWorker(req.body);
    res.status(201).json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- NEW AI PRICING ALGORITHM ---
const getWorkerAlerts = async (req, res) => {
    try {
        const workerId = req.params.id;
        const lat = req.query.lat || 28.6139; 
        const lon = req.query.lon || 77.2090;

        const worker = await Worker.findByPk(workerId);
        if (!worker) return res.status(404).json({ message: "Worker not found" });

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherRes.json();

        let weatherPenalty = 0;
        let riskLevel = "Low (Clear)";
        const mainWeather = weatherData.weather[0].main.toLowerCase();
        
        if (mainWeather.includes('rain') || mainWeather.includes('storm')) {
            weatherPenalty = 15;
            riskLevel = "High (Rain Expected)";
        } else if (weatherData.main.temp > 40) {
            weatherPenalty = 10;
            riskLevel = "Medium (Extreme Heat)";
        }

        let safeWeeks = worker.safe_weeks || 0;
        let basePremium = worker.base_premium || 50;
        let safeDiscount = safeWeeks * 2; 
        
        let finalPremium = basePremium - safeDiscount + weatherPenalty;

        let isFreeWeek = false;
        if (safeWeeks >= 10) {
            finalPremium = 0;
            isFreeWeek = true;
        }

        res.json({
            currentStreak: safeWeeks,
            discount: safeDiscount,
            weatherPenalty: weatherPenalty,
            riskLevel: riskLevel,
            finalPremium: finalPremium,
            isFreeWeek: isFreeWeek,
            cityName: weatherData.name
        });

    } catch (error) {
        console.error("Pricing Algorithm Error:", error);
        res.status(500).json({ error: "Failed to calculate dynamic pricing" });
    }
};

// EXPORT ALL THREE FUNCTIONS!
module.exports = {
  getWorkers,
  createWorker,
  getWorkerAlerts, // <--- Don't forget to export the new one!
};