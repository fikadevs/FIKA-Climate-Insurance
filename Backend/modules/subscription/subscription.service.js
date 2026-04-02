const Subscription = require("./subscription.model");

const createSubscription = async (data) => {
  return await Subscription.create(data);
};

const getSubscriptions = async () => {
  return await Subscription.findAll();
};

const getWorkerSubscription = async (workerId) => {
  return await Subscription.findOne({
    where: { workerId, status: "active" },
  });
};

module.exports = {
  createSubscription,
  getSubscriptions,
  getWorkerSubscription,
};