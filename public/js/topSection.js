import getWeatherData from "./WeatherData.js";
import { cityInputSelector } from "./index.js";
import { getCityDateAndTime } from "./CityDateAndTime.js";
import getAllCities from "./getAllCities.js";
import LiveClock from "./LiveClock.js";
import fillWeatherData from "./fillWeatherData.js";

export const topSectionLiveClock = new LiveClock();

/**
 * Takes city name and initializes the top section with the specified weather information received for particular city.
 *
 * @param {string} city
 */
export const setCityInfo = async (city) => {
  const allCity = await fillWeatherData();
  const cityObj = allCity.getCity(city);
  const cityName = cityObj.getCityName();

  cityInputSelector.value = cityName;

  const date = cityObj.getCityDate();
  const time = cityObj.getCityTime();
  const session = cityObj.getCitySession();
  const temp = cityObj.getCityTemperature();
  const humidity = cityObj.getCityHumidity();
  const precipitation = cityObj.getCityPrecipitation();
  const forecast = await allCity.getCityForecast(city);
  console.log(forecast);

  setCityIcon(city);
  setCityTemperature(temp);
  setCityDateTime(date, time, session);
  setCityHumidityAndPrecipitation(humidity, precipitation);
  setForecastData(forecast, temp);
};

/**
 * Takes a city name and sets the icon in top section of the UI for the particular city.
 *
 * @param {string} cityName
 */
const setCityIcon = (cityName) => {
  const cityIconElement = document.getElementsByClassName("city-icon")[0];
  const iconLocation = `./assets/CityIcons/${cityName}.svg`;
  cityIconElement.src = iconLocation;
};

/**
 * Sets the temperature in top section of the UI.
 *
 * @param {string} cityTemperature
 */
const setCityTemperature = (cityTemperature) => {
  const farenheitTemperature =
    (parseInt(cityTemperature) * (9 / 5) + 32).toFixed(1) + "F";

  const cityCelciusTemperatureElement =
    document.getElementsByClassName("city-temp-c")[0];

  cityCelciusTemperatureElement.innerHTML = cityTemperature + "°C";

  const cityFarenheitTemperatureElement =
    document.getElementsByClassName("city-temp-f")[0];

  cityFarenheitTemperatureElement.innerHTML = farenheitTemperature;
};

/**
 * Sets the city date and time in top section of the UI.
 *
 * @param {String} date
 * @param {string} time
 * @param {string} isAM
 */
const setCityDateTime = (date, time, session) => {
  const dateElement = document.getElementsByClassName("city-date")[0];
  dateElement.innerHTML = date;

  const timeElement = document.getElementsByClassName("city-time")[0];
  timeElement.innerHTML = time.split("-")[0];

  const timeSecondsElement = document.getElementsByClassName("city-second")[0];
  timeSecondsElement.innerHTML = ":" + time.split("-")[1];

  const times = time.split("-")[0] + ":" + time.split("-")[1];

  topSectionLiveClock.liveClock(times, document.querySelector(".time"));

  const dayIcon = "./assets/Images_Icons/amState.svg";
  const nightIcon = "./assets/Images_Icons/pmState.svg";
  const isAMElement = document.getElementsByClassName("day-night-icon")[0];
  isAMElement.src = session === "AM" ? dayIcon : nightIcon;
};

/**
 * Return weather icon based on the temperature passed.
 *
 * @param {number} temp
 * @return {string} weather icon
 */
const getWeatherIconType = (temp) => {
  let weatherType = "";

  if (temp > 29) weatherType = "sunnyIcon";
  else if (temp < 18 && temp > 10) weatherType = "rainyIcon";
  else if (temp >= 23 && temp <= 29) weatherType = "cloudyIcon";
  else if (temp <= 10) weatherType = "snowflakeIcon";
  else weatherType = "windyIcon";

  return weatherType;
};

/**
 * Sets next five hours forecast data in Top Section of the UIU
 *
 * @param {Array<T>} array of forecast temperature
 * @param {number} currentTemp
 */
const setForecastData = (forecast, currentTemp) => {
  const forecastLength = forecast.length;
  let tempNow = parseInt(currentTemp);

  const weatherIconsHTML = document.getElementsByClassName("weather-icon");
  const forecastHTML = document.getElementsByClassName("time-data");

  let weatherType = getWeatherIconType(tempNow);

  let altText = weatherType === "sunnyIcon" ? "sunny" : "snowy";
  let iconLocation = `./assets/WeatherIcons/${weatherType}.svg`;

  weatherIconsHTML[0].setAttribute("src", iconLocation);
  weatherIconsHTML[0].setAttribute("alt", altText);

  forecastHTML[0].innerHTML = tempNow.toString();

  for (let i = 1; i <= forecastLength; i++) {
    let forecastTemp = parseInt(forecast[i - 1]);

    weatherType = getWeatherIconType(forecastTemp);

    altText = weatherType === "sunnyIcon" ? "sunny" : "snowy";
    iconLocation = `./assets/WeatherIcons/${weatherType}.svg`;

    weatherIconsHTML[i].setAttribute("src", iconLocation);
    weatherIconsHTML[i].setAttribute("alt", altText);

    forecastHTML[i].innerHTML = forecastTemp.toString();
  }
};

/**
 * Sets Humidity and Precipitation in top section of UI.
 *
 * @param {string} humidity
 * @param {string} precipitation
 */
const setCityHumidityAndPrecipitation = (humidity, precipitation) => {
  const humidityElement = document.getElementsByClassName("city-humidity")[0];
  humidityElement.innerHTML = humidity + "%";

  const precipitationElement = document.getElementsByClassName(
    "city-precipitation-top"
  )[0];
  precipitationElement.innerHTML = precipitation + "%";
};

/**
 * Sets the input selector data from the api for top Section of UI
 *
 */
export const setCitySelector = async () => {
  const allCities = await getAllCities();
  const city_selector = document.getElementById("cityName");
  let options = "";

  for (let i = 0; i < allCities.length; i++) {
    options += `<option value="${allCities[i]}">${allCities[i]}</option>`;
  }
  city_selector.innerHTML = options;
};
