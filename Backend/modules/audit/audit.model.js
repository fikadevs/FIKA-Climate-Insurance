const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/connection");

const AuditLog = sequelize.define("AuditLog", {
  action: {
    type: DataTypes.STRING,
  },
  entity: {
    type: DataTypes.STRING,
  },
  entityId: {
    type: DataTypes.STRING,
  },
  details: {
    type: DataTypes.JSON,
  },
});

module.exports = AuditLog;