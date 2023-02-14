import getAllContinents from "./allContinents.js";
import getWeatherData from "./WeatherData.js";
import { getCityDateAndTime } from "./CityDateAndTime.js";
import fillWeatherData from "./fillWeatherData.js";
import getAllCities from "./getAllCities.js";

/**
 * Returns a list of popular cities with their weather data
 *
 * @return {Map<string, []}  returns a map of city and it's weather data
 */
const getPopularContinentCities = async () => {
  const cities = await getAllCities();
  const allCity = await fillWeatherData();
  const allCitiesArr = allCity.cities;
  const allContinents = await getAllContinents(allCitiesArr);
  const continentCityMap = new Map();

  for (let continent of allContinents) {
    continentCityMap.set(continent, []);
  }

  allCitiesArr.forEach((city) => {
    const continent = city.getCityTimeZone();
    const eachContinentCityNumber = continentCityMap.get(continent).length;
    const cityTime = city.getCityTime().split("-")[0];
    const session = city.getCitySession();
    const formattedTime = cityTime + " " + session;
    const cityWeather = {
      continentName: continent,
      cityName: city.getCityName(),
      cityTime: formattedTime,
      cityTemperature: city.getCityTemperature() + "°C",
      cityHumidity: city.getCityHumidity() + "%",
    };

    if (eachContinentCityNumber < 2) {
      const currentContinent = continentCityMap.get(continent);
      currentContinent.push(cityWeather);
      continentCityMap.set(continent, currentContinent);
    }
  });
  console.log(continentCityMap);
  return continentCityMap;
};

export default getPopularContinentCities;
