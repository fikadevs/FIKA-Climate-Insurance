const AuditLog = require("./audit.model");

const logAction = async ({ action, entity, entityId, details }) => {
  try {
    await AuditLog.create({
      action,
      entity,
      entityId,
      details,
    });
  } catch (error) {
    console.error("Audit Log Error:", error.message);
  }
};

module.exports = { logAction };