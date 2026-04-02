const Payout = require("./payout.model");
const { processPayment } = require("../../integrations/paymentAPI");
const { logAction } = require("../audit/audit.service");

const createAutoPayout = async (workerId, reason) => {
  let amount = 0;

  if (reason === "rain") amount = 3000;
  if (reason === "pollution") amount = 2000;

  // Step 1: create payout (pending)
  const payout = await Payout.create({
    workerId,
    amount,
    status: "initiated",
    reason,
    paymentStatus: "pending",
  });

  // Step 2: process payment
  const paymentResult = await processPayment({
    workerId,
    amount,
  });

  // After payout created
await logAction({
  action: "PAYOUT_CREATED",
  entity: "Payout",
  entityId: payout.id,
  details: { workerId, amount, reason },
});

// After payment processed
await logAction({
  action: "PAYMENT_PROCESSED",
  entity: "Payout",
  entityId: payout.id,
  details: paymentResult,
});

  // Step 3: update payout
  payout.status = paymentResult.status;
  payout.transactionId = paymentResult.transactionId;
  payout.paymentStatus = paymentResult.status;

  await payout.save();

  return payout;
};

module.exports = { createAutoPayout };