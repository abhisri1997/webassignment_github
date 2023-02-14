import { setCityInfo, setCitySelector } from "./topSection.js";
import getAllCities from "./getAllCities.js";
import { dynamicCard, carouselSlider } from "./midSection.js";
import { dynamicContinentCard } from "./bottomSection.js";
import {
  sortContinentByName,
  sortContinentByTemperature,
} from "./sortContinent.js";
import { topSectionLiveClock } from "./topSection.js";

export let cityInputSelector = document.querySelector(
  ".city-selector > input[type=text]"
);

const preferenceIconSelector = document.querySelectorAll(
  ".preference-icon > .icons"
);

export const spinnerSelector = document.querySelector("#top-picker");

export const continentCardSelector = document.querySelector(
  ".continent-temp-data"
);

export const carouselSelector = document.querySelector(".carousel-container");

const leftArrowSelector = document.querySelector(".left-arrow");

const rightArrowSelector = document.querySelector(".right-arrow");

let activeElementSelector = document.querySelector(".active");

export let activePreferenceIconSelector = document.querySelectorAll(
  ".active > .icons > img"
);

let sortContinetByContinentNameSelector = document.querySelector(
  ".sort-continent_name"
);

let sortByContinentTemperatureSelector = document.querySelector(".sort-temp");

const loadingSelector = document.querySelector(".loading");

const containerSelector = document.querySelector(".container");

/**
 * Starts the screen loading animation
 *
 */
function startLoading() {
  containerSelector.style.display = "none";
}

/**
 * Stops the screen loading animation
 *
 */
function stopLoading() {
  setTimeout(() => {
    loadingSelector.remove();
    containerSelector.style.display = "block";
  }, 1000);
}

//IIFE for first page load.

(async () => {
  startLoading();

  const allCities = await getAllCities();
  const isSortedAscending = false;
  let sortedPopularContinentCities = await sortContinentByName(true);
  sortedPopularContinentCities = await sortContinentByTemperature(
    sortedPopularContinentCities,
    isSortedAscending
  );

  setCitySelector();
  setCityInfo(allCities[0]);
  dynamicCard("sunny");
  dynamicContinentCard(sortedPopularContinentCities);

  stopLoading();
})();

// On Input change event listener for top section when city name changes

cityInputSelector.addEventListener("change", async (e) => {
  cityInputSelector = document.querySelector(
    ".city-selector > input[type=text]"
  );
  let currentCityValue = cityInputSelector.value;
  const allCities = await getAllCities();

  if (allCities.includes(currentCityValue)) {
    topSectionLiveClock.clearLiveClock();
    setCityInfo(currentCityValue);
  } else {
    alert("Please input correct city name");
    e.target.value = "";
  }
});

cityInputSelector.addEventListener("click", (e) => {
  e.target.value = "";
});

// Event listeners for all the icons in middle section of the UI.

preferenceIconSelector.forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    const weatherType = event.target.alt.split(" ")[0];
    activeElementSelector = document.querySelector(".active");

    activeElementSelector.classList.remove("active");
    el.parentElement.classList.add("active");

    dynamicCard(weatherType);
  });
});

// On input change event listener for mid section spinner

spinnerSelector.addEventListener("change", (e) => {
  const spinnerValue = e.target.value;
  if (spinnerValue > 10 || spinnerValue < 3) {
    console.error("Please select values between 10 and 3");
    if (spinnerValue < 3) spinnerSelector.value = 3;
    else spinnerSelector.value = 10;
  } else {
    let weatherType = document.querySelector(".active img").alt.split(" ")[0];
    dynamicCard(weatherType);
  }
});

// Left and right carousel button event Listeners

leftArrowSelector.addEventListener("click", carouselSlider);
rightArrowSelector.addEventListener("click", carouselSlider);

// Event listener to handle sorting of continent cards based on continent name

sortContinetByContinentNameSelector.addEventListener("click", async (e) => {
  e.preventDefault();
  let ascendingSort =
    e.target.nextElementSibling.alt === "sort_up" ? true : false;

  if (ascendingSort) {
    e.target.nextElementSibling.alt = "sort_down";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowDown.svg";
    ascendingSort = false;
  } else {
    e.target.nextElementSibling.alt = "sort_up";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowUp.svg";
    ascendingSort = true;
  }

  let sortedMap = await sortContinentByName(ascendingSort);
  sortByContinentTemperatureSelector = document.querySelector(".sort-temp");
  const continentAscendingTempSort =
    sortByContinentTemperatureSelector.querySelector("img").alt === "sort_up"
      ? true
      : false;
  sortedMap = sortContinentByTemperature(sortedMap, continentAscendingTempSort);
  dynamicContinentCard(sortedMap);
});

// Event listener to handle sorting of continent cards based on continent city temperature

sortByContinentTemperatureSelector.addEventListener("click", async (e) => {
  e.preventDefault();
  let ascendingSort =
    e.target.nextElementSibling.alt === "sort_up" ? true : false;

  if (ascendingSort) {
    e.target.nextElementSibling.alt = "sort_down";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowDown.svg";
    ascendingSort = false;
  } else {
    e.target.nextElementSibling.alt = "sort_up";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowUp.svg";
    ascendingSort = true;
  }
  sortContinetByContinentNameSelector = document.querySelector(
    ".sort-continent_name"
  );
  const continentAscendingContinentSort =
    sortContinetByContinentNameSelector.querySelector("img").alt === "sort_up"
      ? true
      : false;
  let sortedMap = await sortContinentByName(continentAscendingContinentSort);
  sortedMap = sortContinentByTemperature(sortedMap, ascendingSort);
  dynamicContinentCard(sortedMap);
});
