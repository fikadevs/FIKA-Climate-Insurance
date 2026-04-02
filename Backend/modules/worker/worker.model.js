const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/connection");

const Worker = sequelize.define("Worker", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
  },
  weeklyIncome: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  zone: {
    type: DataTypes.STRING,
  },
});

module.exports = Worker;