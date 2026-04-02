const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" PostgreSQL Connected");
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