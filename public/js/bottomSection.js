import { continentCardSelector } from "./index.js";
import LiveClock from "./LiveClock.js";

/**
 * Dynamically generate card for bottom section of the UI
 *
 * @param {Map<string, [Object]} popularContinentDetails - Map of continents and it's popular cities
 * @returns {null}
 */
export const dynamicContinentCard = async (data) => {
  let continentCardHTML = "";
  let counter = 0;
  const popularContinentDetails = await data;

  for (let [key, value] of popularContinentDetails.entries()) {
    value.forEach((continentCity) => {
      const {
        continentName,
        cityName,
        cityTime,
        cityTemperature,
        cityHumidity,
      } = continentCity;

      counter++;

      let id = `bottom-section-time-${counter}`;

      continentCardHTML +=
        counter < 13
          ? `
        <div class="continent-card">

          <div class="continent-details">

            <h4 class="continent-name">${continentName}</h4>

              <span class="continent-city-time">

                <h5 class="continent-city">${cityName}, &nbsp</h5>
                <h5 class="continent-time" id="${id}">${cityTime}</h5>

              </span>

          </div>

          <div class="continent-temp-details">

            <h4 class="city-temperature">${cityTemperature}</h4>

            <div class="city-precipitation">

              <img src="./assets/WeatherIcons/humidityIcon.svg" alt="" class="card-icon" loading="lazy">
              <h6>${cityHumidity}</h6>

            </div>

          </div>

        </div>
      `
          : "";
    });
  }
  continentCardSelector.innerHTML = continentCardHTML;
  const allContinentCardSelectors =
    document.querySelectorAll(".continent-card");

  allContinentCardSelectors.forEach((continentCardHTML, counter) => {
    let id = `bottom-section-time-${counter + 1}`;
    let currentElement = document.querySelector(`#${id}`);
    let cityTime = currentElement.innerHTML.split(" ")[0] + ":" + "55";
    const bottomSectionLiveClock = new LiveClock();
    bottomSectionLiveClock.liveClock(cityTime, currentElement);
  });
};
