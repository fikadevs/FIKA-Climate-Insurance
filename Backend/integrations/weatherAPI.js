const axios = require("axios");

const getWeatherData = async (city) => {
  try {
    const API_KEY = process.env.WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);

    const data = response.data;

    return {
  lat: data.coord.lat,
  lon: data.coord.lon,
  temperature: data.main.temp,
  humidity: data.main.humidity,
  weather: data.weather[0].main,
  rainfall: data.rain?.["1h"] || 0,
};
  } catch (error) {
    console.error("Weather API Error:", error.message);
    return null;
  }
};

module.exports = { getWeatherData };