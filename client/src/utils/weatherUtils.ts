import { WeatherResponse } from "../types/weatherSchema";

export function formatWeatherDate(date: string) {
  return date.split("-").reverse().join("/");
}

export function getDateTimeObjectFromWeather(data?: WeatherResponse) {
  if (!data)
    return {
      date: "",
      time: "",
    };
  const [date, time] = data!.localtime.split(" ");
  return {
    date: formatWeatherDate(date.toString()),
    time,
  };
}
