import { getCityDateAndTime } from "./CityDateAndTime.js";
import { spinnerSelector, carouselSelector } from "./index.js";
import LiveClock from "./LiveClock.js";
import fillWeatherData from "./fillWeatherData.js";

let activePreferenceIconSelector = document.querySelectorAll(
  ".active > .icons > img"
);

/**
 * Get all weather data for the preferred weather type(middle section)
 *
 * @param {string} weatherType - Type of weather
 * @return {[]}
 */
const getPrefereceWeatherDetails = async (weatherType) => {
  const allCity = await fillWeatherData();
  const weatherDetails = allCity.cities;
  const response = [];

  weatherDetails.forEach((city) => {
    const temperatureCheck = city.getCityTemperature();
    const humidityCheck = city.getCityHumidity();
    const precipitationCheck = city.getCityPrecipitation();

    if (
      weatherConditionCheck(
        weatherType,
        temperatureCheck,
        humidityCheck,
        precipitationCheck
      )
    ) {
      response.push(city);
    }
  });

  return response;
};
/**
 * Returns true if the provided checks are successful for the provided weather type used in the mid section of the UI
 *
 * @param {string} weatherType - Type of weather to check, example "sunny", "rainy", etc.
 * @param {Number} temperatureCheck - Temperature in Celsius to check for given weather type
 * @param {Number} humidityCheck - Humidity in percentage to check for given weather type
 * @param {Number} precipitationCheck - Precipitation in percentage to check for given weather type
 * @returns {boolean}
 */
const weatherConditionCheck = (
  weatherType,
  temperatureCheck,
  humidityCheck,
  precipitationCheck
) => {
  switch (weatherType) {
    case "sunny":
      if (
        temperatureCheck >= 29 &&
        humidityCheck < 50 &&
        precipitationCheck > 50
      ) {
        return true;
      }
      break;
    case "snowy":
      if (
        temperatureCheck >= 20 &&
        temperatureCheck <= 28 &&
        humidityCheck > 50 &&
        precipitationCheck < 50
      ) {
        return true;
      }
      break;
    case "rainy":
      if (temperatureCheck < 20 && humidityCheck >= 50) {
        return true;
      }
      break;
    default:
      console.error("Unknown weather type condition: " + weatherType);
  }

  return false;
};
/**
 * Generates dynamic weather carousel cards based on the weather conditions provided in mid section of the UI
 *
 * @param {string} [weatherType="sunny"] - Weather condition, default is "sunny"
 * @returns {null}
 */
export const dynamicCard = async (weatherType = "sunny") => {
  activePreferenceIconSelector = document.querySelectorAll(
    ".active > .icons > img"
  );
  const preferredWeatherCityDeatils = await getPrefereceWeatherDetails(
    weatherType
  );
  const preferredWeatherCities = preferredWeatherCityDeatils.length;
  const numberOfCards = Math.min(
    Math.min(preferredWeatherCities, spinnerSelector.value),
    10
  );

  let card = "";
  let customCardStyle = {};

  for (let i = 0; i < numberOfCards; i++) {
    const city_name = preferredWeatherCityDeatils[i].cityName;
    const date_time = getCityDateAndTime(
      preferredWeatherCityDeatils[i].cityDateAndTime
    );
    const city_time =
      preferredWeatherCityDeatils[i].getCityTime().split("-")[0] +
      " " +
      preferredWeatherCityDeatils[i].getCitySession();
    const city_date = date_time[0];
    const city_humidity = preferredWeatherCityDeatils[i].cityHumidity;
    const city_temp = preferredWeatherCityDeatils[i].cityTemp;
    const city_precipitation = preferredWeatherCityDeatils[i].cityPrecipitation;
    const weatherType = activePreferenceIconSelector[0].alt.split(" ")[0];

    let weatherTypeIcon;

    switch (weatherType) {
      case "sunny":
        weatherTypeIcon = "sunnyIcon";
        break;
      case "snowy":
        weatherTypeIcon = "snowflakeIcon";
        break;
      case "rainy":
        weatherTypeIcon = "rainyIcon";
        break;
      default:
        console.error("Unknown weather type");
    }

    card += `
          <div class="card card-${i + 1}">

            <div class="card-details">

              <h2 class="city-name">${city_name}</h2>
              <h3 class="current-time" id="mid-section-time-${
                i + 1
              }">${city_time}</h3>
              <h3 class="current-date">${city_date}</h3>

              <div class="card-humidity">

                <img src="./assets/WeatherIcons/humidityIcon.svg" alt="" class="card-icon" loading="lazy">
                <h6>${city_humidity}</h6>

              </div>

              <div class="card-precipitation">

                <img src="./assets/WeatherIcons/precipitationIcon.svg" alt="" class="card-icon" loading="lazy">
                <h6>${city_precipitation}</h6>

              </div>

            </div>

            <div class="card-temp">

              <img src="./assets/WeatherIcons/${weatherTypeIcon}.svg" alt="" class="card-icon" loading="lazy">
              ${city_temp}

            </div>

          </div>`;
  }

  carouselSelector.innerHTML = card;

  for (let i = 0; i < numberOfCards; i++) {
    const currentCard = `card-${i + 1}`;
    const city_name = preferredWeatherCityDeatils[i].cityName
      .replace(/\s/g, "")
      .toLowerCase();
    const currentCardSelector = document.querySelector(`.${currentCard}`);
    const currentCardID = `mid-section-time-${i + 1}`;
    const currentCardTimeElement = document.querySelector(`#${currentCardID}`);
    const currentTime =
      currentCardTimeElement.innerHTML.split(" ")[0] + ":" + "00";

    const midSectionLiveClock = new LiveClock();
    midSectionLiveClock.liveClock(currentTime, currentCardTimeElement);

    currentCardSelector.style.cssText = `
      background-color: var(--bg-dark-grey-tile);
      background-image: url("./../assets/CityIcons/${city_name}.svg");
      background-repeat: no-repeat;
      background-blend-mode: screen;
    `;
  }
};
/**
 * Slides the cards left and right in mid section of the UI
 *
 * @param {Object} e - event parameter when left/right arrows are clicked
 */
export const carouselSlider = (e) => {
  const cardsSelector = document.querySelectorAll(".card");
  const cardsContainerSelector = document.querySelector(".carousel-container");
  const clickedClassName = e.target.className;
  let cardWidth = cardsSelector[1].clientWidth;

  if (clickedClassName === "left-arrow" || clickedClassName === "left-icon") {
    cardsContainerSelector.scrollLeft -= cardWidth;
  }
  if (clickedClassName == "right-arrow" || clickedClassName == "right-icon") {
    cardsContainerSelector.scrollLeft += cardWidth;
  }
};
