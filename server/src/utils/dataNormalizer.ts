import { CityData, CityResponse } from "./citySchema";
import { ForecastDay, WeatherData, WeatherResponse } from "./weatherSchema";

function getRelevantHourDataFromForecast(data: ForecastDay[]) {
  const currentHour = new Date().getHours();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  for (const day of data) {
    const filteredHours = day.hour.filter((hourObj) => {
      const hour = parseInt(hourObj.time.split(" ")[1].split(":")[0], 10);
      const date = new Date(day.date).toDateString();
      if (date === today.toDateString()) {
        return hour >= currentHour && hour < currentHour + 5;
      } else if (date === tomorrow.toDateString()) {
        if (currentHour >= 19) {
          return hour < 5 - (24 - currentHour);
        }
      }
      return false;
    });

    day.hour = filteredHours;
  }

  return data;
}

export function trimWeatherData(data: WeatherData): WeatherResponse {
  const { location, current, forecast } = data;

  const days = getRelevantHourDataFromForecast(forecast.forecastday);
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
    forecast: forecast,
  };
}

export function trimCityData(data: CityData[]): CityResponse[] {
  return data.map((city) => ({
    name: city.name,
    country: city.country,
    longitude: city.lon,
    lattitude: city.lat,
  }));
}
