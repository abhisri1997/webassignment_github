import City from "./City.js";
import getWeatherData from "./WeatherData.js";

/**
 * Takes arrays of City objects
 *
 * @param {Array<City>} array of city objects
 */
class Cities extends City {
  constructor(cities) {
    super();
    this.cities = cities ? cities : [];
  }
  getCity(cityName) {
    return this.cities.find((city) => city.cityName === cityName);
  }
  addCity(city) {
    this.cities.push(city);
  }
  removeCity(cityName) {
    this.cities = this.cities.filter((city) => city.cityName !== cityName);
  }
}

export default Cities;
