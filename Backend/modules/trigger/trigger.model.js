const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/connection");

const Trigger = sequelize.define("Trigger", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING, // rain, heat, aqi
  },
  value: {
    type: DataTypes.FLOAT,
  },
  threshold: {
    type: DataTypes.FLOAT,
  },
  zone: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Trigger;