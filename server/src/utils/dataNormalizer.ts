import { City } from "../types/city";
import {
  Forecast,
  ForecastDay,
  Hour,
  WeatherData,
  WeatherResponse,
} from "./weatherSchema";

function getRelevantHours(data: ForecastDay[]) {
  const currentHour = new Date().getHours();
  const relevantHours = [];
  const today = new Date().toDateString();

  for (const day of data) {
    const filteredHours = day.hour.filter((hourObj: Hour) => {
      const hour = parseInt(hourObj.time.split(" ")[1].split(":")[0], 10);
      if (new Date(day.date).toDateString() === today) {
        if (currentHour >= 19) {
          return hour >= 19 || hour <= 23;
        } else {
          return hour >= currentHour && hour < currentHour + 5;
        }
      } else {
        if (currentHour >= 19) {
          return hour < 5 - (24 - currentHour);
        }
      }
      return false;
    });

    relevantHours.push(...filteredHours);
  }

  return relevantHours;
}

export function trimWeatherData(data: WeatherData): WeatherResponse {
  const { location, current, forecast } = data;

  const hours = getRelevantHours(forecast.forecastday);
  forecast.forecastday[0].hour = hours;

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
    forecast: forecast,
  };
}

export function trimCityData(data: any[]): City[] {
  console.log(data);
  return data.map((city) => ({
    name: city.name,
    country: city.country,
    longitude: city.lon,
    lattitude: city.lat,
  }));
}
