import getWeatherData from "./WeatherData.js";
import City from "./City.js";
import Cities from "./Cities.js";

/**
 * Fetches the data from the API and fills Data in cities object
 *
 * @return {Object} Cities object
 */
const fillWeatherData = async () => {
  const data = await getWeatherData();
  const allCities = [];

  data.forEach((cityObj) => {
    const cityName = cityObj.cityName;
    const cityHumidity = cityObj.humidity;
    const cityTemp = cityObj.temperature;
    const cityPrecipitation = cityObj.precipitation;
    const cityContinent = cityObj.timeZone;
    const cityDateAndTime = cityObj.dateAndTime;

    const city = new City(
      cityName,
      cityHumidity,
      cityTemp,
      cityPrecipitation,
      cityContinent,
      cityDateAndTime
    );
    allCities.push(city);
  });

  const cities = new Cities(allCities);

  return cities;
};

export default fillWeatherData;
