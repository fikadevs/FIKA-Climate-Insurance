const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/connection");

const Fraud = sequelize.define("Fraud", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  workerId: {
    type: DataTypes.UUID,
  },
  riskScore: {
    type: DataTypes.FLOAT, // 0 to 1
  },
  status: {
    type: DataTypes.STRING, // safe, suspicious, fraud
  },
});

module.exports = Fraud;