require("dotenv").config({ path: "../.env" });

const axios = require("axios");

const getAQIData = async (lat, lon) => {
  try {
    const API_KEY = process.env.WEATHER_API_KEY;

    console.log("AQI INPUT:", { lat, lon });
    console.log("API KEY:", API_KEY);

    if (!lat || !lon) {
      console.error("Invalid lat/lon");
      return null;
    }

    if (!API_KEY) {
      console.error("Missing API Key");
      return null;
    }

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    const response = await axios.get(url);

    const data = response.data.list?.[0];

    return {
      aqi: data.main.aqi,
      components: data.components,
    };
  } catch (error) {
    console.error(
      "AQI API Error:",
      error.response?.data || error.message
    );
    return null;
  }
};

module.exports = { getAQIData };