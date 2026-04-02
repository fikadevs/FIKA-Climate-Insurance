const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/connection");
const Payout = sequelize.define("Payout", {
  workerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
  transactionId: {
    type: DataTypes.STRING,
  },
  reason: {
    type: DataTypes.STRING,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

module.exports = Payout;