const axios = require("axios");

const ML_BASE_URL = "http://127.0.0.1:8000";

// 🔥 Fraud prediction
const predictFraud = async (data) => {
  try {
    const res = await axios.post(`${ML_BASE_URL}/fraud/`, data);
    return res.data;
  } catch (error) {
    console.error("ML Fraud Error:", error.message);
    return null;
  }
};

// 💰 Income prediction
const predictIncomeLoss = async (data) => {
  try {
    const res = await axios.post(`${ML_BASE_URL}/income/`, data);
    return res.data;
  } catch (error) {
    console.error("ML Income Error:", error.message);
    return null;
  }
};

module.exports = {
  predictFraud,
  predictIncomeLoss,
};