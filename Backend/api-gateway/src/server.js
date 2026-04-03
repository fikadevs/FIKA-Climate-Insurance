// Core imports
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../../.env" });

// DB & services
const { sequelize, connectDB } = require("../../database/connection");
const { startTriggerCron } = require("./cron/trigger.cron");

// App init
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/workers", require("../../modules/worker/worker.routes"));
app.use("/api/payouts", require("../../modules/payout/payout.routes"));
app.use("/api/triggers", require("../../modules/trigger/trigger.routes"));
app.use("/api/fraud", require("../../modules/fraud/fraud.routes"));
app.use("/api/subscriptions", require("../../modules/subscription/subscription.routes"));

// Health check route (optional but useful)
app.get("/", (req, res) => {
  res.send("API Gateway is running...");
});

// Server starter function
const startServer = async () => {
  try {
    // Connect DB
    await connectDB();
    console.log(" Database connected");

    // Sync models
    await sequelize.sync({ alter: true });
    console.log(" Database synced");

    // Start cron jobs
    startTriggerCron();
    console.log(" Cron jobs started");

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(" Failed to start server:", error);
  }
};
// Add this route to your backend file (e.g., app.js or server.js)

app.get('/api/weather', async (req, res) => {
    try {
        // Grab the coordinates the frontend sent us
        const { lat, lon } = req.query; 
        
        // Securely grab the API key from the server environment
        const apiKey = process.env.OPENWEATHER_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: "Server missing Weather API Key" });
        }

        // 1. Fetch Weather (Node 18+ has built-in fetch!)
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherRes.json();
        
        // 2. Fetch AQI
        const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const aqiData = await aqiRes.json();

        // 3. Bundle it up and send it to the frontend!
        res.json({ 
            weather: weatherData, 
            aqi: aqiData 
        });

    } catch (error) {
        console.error("Weather Proxy Error:", error);
        res.status(500).json({ error: "Failed to fetch weather data securely" });
    }
});
// Start everything
startServer();