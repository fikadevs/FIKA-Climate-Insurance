const axios = require("axios");

//  Simulated Payment API
const processPayment = async ({ workerId, amount }) => {
  try {
    console.log(` Processing payment for Worker ${workerId}...`);

    // Simulate delay (like real payment gateway)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    //  Simulated success response
    const response = {
      status: "success",
      transactionId: "TXN_" + Date.now(),
      workerId,
      amount,
    };

    console.log(" Payment Success:", response);

    return response;
  } catch (error) {
    console.error(" Payment Failed:", error.message);

    return {
      status: "failed",
      error: error.message,
    };
  }
};

module.exports = { processPayment };