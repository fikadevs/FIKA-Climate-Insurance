require("dotenv").config({ path: "../.env" });

const { sequelize } = require("./connection");

//  Correct model imports
require("../modules/worker/worker.model");
require("../modules/trigger/trigger.model");
require("../modules/payout/payout.model");
require("../modules/fraud/fraud.model");
require("../modules/subscription/subscription.model");

//  Assign models
const Worker = require("../modules/worker/worker.model");
const Trigger = require("../modules/trigger/trigger.model");
const Payout = require("../modules/payout/payout.model");
const Fraud = require("../modules/fraud/fraud.model");
const Subscription = require("../modules/subscription/subscription.model");

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    console.log(" Seeding database...");

    // Workers
    const worker1 = await Worker.create({
      name: "Rahul",
      phone: "9999999999",
      weeklyIncome: 6000,
      zone: "A",
    });

    const worker2 = await Worker.create({
      name: "Amit",
      phone: "8888888888",
      weeklyIncome: 5000,
      zone: "B",
    });

    // Triggers
    await Trigger.bulkCreate([
      { type: "rain", threshold: 80, zone: "A" },
      { type: "heat", threshold: 40, zone: "B" },
    ]);

    // Subscription
    await Subscription.create({
      workerId: worker1.id,
      amount: 40,
      status: "active",
    });

    // Payout
    await Payout.create({
      workerId: worker1.id,
      amount: 3000,
      status: "completed",
    });

    // Fraud
    await Fraud.create({
      workerId: worker1.id,
      riskScore: 0.2,
      status: "safe",
    });

    console.log(" Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error(" Seed error:", error);
    process.exit(1);
  }
};

seedData();