const fetch = require('node-fetch');

async function getWeatherData(lat, lon) {
  const apiRes = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_IO_KEY}&lat=${lat}&lon=${lon}`);
  const apiData = await apiRes.json();
  const data = apiData.data.map((wo) => {
    return {
      forecast: wo.weather.description,
      time: new Date(wo.ts * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    };
  });
  return data;
}

module.exports = {
  getWeatherData,
};