const cron = require("node-cron");
const { checkEnvironmentTrigger } = require("../../../modules/trigger/trigger.service");

//  Define zones (you can move this to DB later)
const zones = ["A", "B"];

// Run every 1 minute (for testing)
// Change later to '0 * * * *' (every hour)
const startTriggerCron = () => {
  cron.schedule("* * * * *", async () => {
    console.log(" Running Trigger Cron Job...");

    for (let zone of zones) {
      try {
        const result = await checkEnvironmentTrigger("Delhi", zone);

        console.log(`Zone ${zone}:`, result.triggers);
      } catch (error) {
        console.error("Cron Error:", error.message);
      }
    }
  });
};

module.exports = { startTriggerCron };