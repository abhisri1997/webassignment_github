import getWeatherData from "./WeatherData.js";

/**
 * Gets all the cities from API.
 *
 * @return {Array} Array of cities
 */
const getAllCities = async () => {
  const weatherData = await getWeatherData();
  const allCities = [];

  weatherData.forEach((cityObj) => {
    const cityName = cityObj.cityName;
    allCities.push(cityName);
  });

  allCities.sort();

  return allCities;
};

export default getAllCities;
