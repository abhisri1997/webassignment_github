const { allTimeZones } = require("./timeZone");

const serveAllCityWeather = (request, response) => {
  const weatherData = JSON.stringify(allTimeZones());
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(weatherData);
};

module.exports = serveAllCityWeather;
