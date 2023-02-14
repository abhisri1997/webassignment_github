import fillWeatherData from "./fillWeatherData.js";

/**
 * It takes object as an argument and returns a set of all continents
 *
 * @param {Object} weatherData - object of weather data
 * @return {Set<string>} set of all continents
 */
const getAllContinents = async (weatherData) => {
  const allContinentsSet = new Set();
  const data = await weatherData;
  const allCity = await fillWeatherData();

  data.forEach((city) => {
    const cityObj = allCity.getCity(city.cityName);
    const continent = cityObj.getCityTimeZone();
    allContinentsSet.add(continent);
  });

  return allContinentsSet;
};

export default getAllContinents;
