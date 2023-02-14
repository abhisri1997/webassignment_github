import { getCityDate, getCityTime, getCitySession } from "./CityDateAndTime.js";
import getWeatherData from "./WeatherData.js";

/**
 * City Class takes city information as parameters
 *
 * @param {string} cityValue
 * @param {string} cityName - City name
 * @param {string} cityHumidity - City humidity
 * @param {string} cityTemp - City temperature
 * @param {string} cityPrecipitation - City Precipitation
 * @param {string} cityContinent - City Continent
 * @param {string} cityDateAndTime - City Date and Time
 */
class City {
  constructor(
    cityName,
    cityHumidity,
    cityTemp,
    cityPrecipitation,
    cityContinent,
    cityDateAndTime
  ) {
    this.cityName = cityName;
    this.cityTemp = cityTemp;
    this.cityHumidity = cityHumidity;
    this.cityPrecipitation = cityPrecipitation;
    this.cityContinent = cityContinent;
    this.cityDateAndTime = cityDateAndTime;
    this.cityNextFiveHrsForecast = "";
  }

  /**
   *
   * @returns {string} City Name
   */
  getCityName() {
    return this.cityName;
  }

  /**
   * Return city date
   * @returns {string} - City Date
   */
  getCityDate() {
    return getCityDate(this.cityDateAndTime);
  }

  /**
   * Return city time
   * @returns {string} - City Time
   */
  getCityTime() {
    return getCityTime(this.cityDateAndTime);
  }

  /**
   * Returns city session
   * @returns {string} - City Session
   */
  getCitySession() {
    return getCitySession(this.cityDateAndTime);
  }

  /**
   * Return city continent
   * @returns {string} - City Continent
   */
  getCityTimeZone() {
    return this.cityContinent ? this.cityContinent.split("/")[0] : "";
  }

  /**
   * Returns city temperature
   * @returns {Number} - City Temperature
   */
  getCityTemperature() {
    return this.cityTemp ? parseInt(this.cityTemp) : "";
  }

  /**
   * Returns city humidity
   * @returns {Number} - City Humidity
   */
  getCityHumidity() {
    return this.cityHumidity ? parseInt(this.cityHumidity) : "";
  }

  /**
   * Returns city precipitation
   * @returns {Number} - City Precipitation
   */
  getCityPrecipitation() {
    return this.cityPrecipitation ? parseInt(this.cityPrecipitation) : "";
  }

  async setCityForecast(cityName) {
    const base = `${location.protocol}//${location.host}`;
    const url = `${base}/hourly-forecast`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const cityObj = this.cities.find((city) => city.cityName === cityName);
    const city_Date_Time_Name = `${cityObj.cityDateAndTime}, ${cityObj.cityName}`;
    const raw = JSON.stringify({
      city_Date_Time_Name,
      hours: 6,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const apiResponse = await fetch(url, requestOptions);
    const weatherForecast = await apiResponse.json();
    this.cityNextFiveHrsForecast = weatherForecast.temperature;
  }

  async getCityForecast(cityName) {
    if (!this.cityNextFiveHrsForecast) {
      await this.setCityForecast(cityName);
    }
    return this.cityNextFiveHrsForecast;
  }
}

export default City;
