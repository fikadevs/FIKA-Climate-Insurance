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

// Start everything
startServer();