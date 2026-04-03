const { Sequelize } = require("sequelize");
require("dotenv").config();

// NEW: Connect using the single DATABASE_URL with SSL enabled
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // CRITICAL: This fixes the "connection is insecure" error
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" PostgreSQL Connected Securely");
  } catch (error) {
    console.error(" DB Connection Error:", error);
  }
};

module.exports = { sequelize, connectDB };

// Import ALL models so Sequelize registers them
require("../modules/worker/worker.model");
require("../modules/trigger/trigger.model");
require("../modules/payout/payout.model");
require("../modules/fraud/fraud.model");

// audit + subscription
require("../modules/audit/audit.model");
require("../modules/subscription/subscription.model");