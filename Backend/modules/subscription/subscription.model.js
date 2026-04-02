const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/connection");

const Subscription = sequelize.define("Subscription", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  workerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  plan: {
    type: DataTypes.STRING,
    defaultValue: "weekly",
  },
  amount: {
    type: DataTypes.FLOAT,
    defaultValue: 40,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active", // active, expired
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  endDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Subscription;