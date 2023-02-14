import getPopularContinentCities from "./popularContinentCities.js";

/**
 * Sorth the weather data according to the continent name
 *
 * @param {boolean} ascendingSort - boolean value to sort the output ascending or descending
 * @return {Map<String, [Object]>} Sorted Map
 */
export const sortContinentByName = async (ascendingSort) => {
  const popularContinentDetails = await getPopularContinentCities();
  let sortedMap = new Map();
  const sortedArray = Array.from(popularContinentDetails).sort((a, b) => {
    if (ascendingSort) {
      return a[0].localeCompare(b[0]);
    } else {
      return b[0].localeCompare(a[0]);
    }
  });

  for (let [key, value] of sortedArray) {
    sortedMap.set(key, value);
  }

  return sortedMap;
};
/**
 * Sorth the provided weather data according to the temperature
 *
 * @param {Map<string, [Object]>} weatherData - Map of continents and it's popular cities weather info
 * @param {boolean} ascendingSort - boolean value to sort the output ascending or descending
 * @return {Map<string, [Object]>}  Sorted Map
 */
export const sortContinentByTemperature = async (
  weatherData,
  ascendingSort
) => {
  let sortedMap = new Map();

  let mapToArray = Array.from(weatherData);

  mapToArray.forEach((key) => {
    key[1].sort((a, b) => {
      const tempA = parseInt(a.cityTemperature);
      const tempB = parseInt(b.cityTemperature);
      if (ascendingSort) {
        return tempA - tempB;
      } else {
        return tempB - tempA;
      }
    });
  });

  for (let [key, value] of mapToArray) {
    sortedMap.set(key, value);
  }

  return sortedMap;
};
