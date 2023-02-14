// import data from "../assets/data/data.js";

/**
 * Returns weather information in object format
 *
 * @return {json} JSON representation
 */
const getWeatherData = async () => {
  const base = `${location.protocol}//${location.host}`;
  const url = `${base}/all-timezone-cities`;
  const apiResponse = await fetch(url);
  const data = await apiResponse.json();
  return data;
};

export default getWeatherData;
