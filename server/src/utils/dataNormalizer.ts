import { CityData, CityResponse } from "../types/city";
import { WeatherData, WeatherResponse } from "../types/weather";

function getRelevantHourDataFromForecast(data: WeatherData) {
  const currentHour = new Date(data.location.localtime).getHours();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const todayString = today.toDateString();
  const tomorrowString = tomorrow.toDateString();

  const { forecastday } = data.forecast;

  for (const day of forecastday) {
    const filteredHours = day.hour.filter((hourObj) => {
      const hour = parseInt(hourObj.time.split(" ")[1].split(":")[0], 10);
      const date = new Date(day.date).toDateString();
      if (date === todayString) {
        return hour >= currentHour && hour < currentHour + 5;
      } else if (date === tomorrowString) {
        if (currentHour >= 19) {
          return hour < 5 - (24 - currentHour);
        }
      }
      return false;
    });

    day.hour = filteredHours;
  }

  return forecastday;
}

export function getNormalizedWeatherData(data: WeatherData): WeatherResponse {
  const { location, current, forecast } = data;

  const days = getRelevantHourDataFromForecast(data);
  forecast.forecastday = days;

  return {
    name: location.name,
    lat: location.lat,
    lon: location.lon,
    country: location.country,
    localtime: location.localtime,
    temp_c: current.temp_c,
    temp_f: current.temp_f,
    condition: current.condition,
    wind_mph: current.wind_mph,
    wind_kph: current.wind_kph,
    precip_mm: current.precip_mm,
    precip_in: current.precip_in,
    humidity: current.humidity,
    last_updated: current.last_updated,
    forecast: forecast,
  };
}

export function getNormalizedCityData(data: CityData[]): CityResponse[] {
  return data.map((city) => ({
    name: city.name,
    country: city.country,
    longitude: city.lon,
    lattitude: city.lat,
  }));
}
