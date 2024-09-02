import { WeatherResponse } from "../../types/weatherSchema";
import HourForecast from "../hourForecast/hourForecast";
import "./weatherDisplay.css";
import WeatherStat from "../weatherStat/weatherStat";
import { useMemo } from "react";

interface WeatherDisplayProps {
  weatherData?: WeatherResponse;
  isLoading: boolean;
  hasErrors: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  isLoading,
  hasErrors,
}) => {
  const dateObj = useMemo(() => {
    return {
      date: weatherData?.forecast.forecastday[0].date,
      time: weatherData?.forecast.forecastday[0].hour[0].time.split(" ")[1],
    };
  }, [weatherData]);

  const placeholder = useMemo(() => {
    if (isLoading) return "Loading...";
    if (hasErrors) return "There has been an error, please try again";
    return "Search to view weather data";
  }, [isLoading, hasErrors]);
  return (
    <>
      {weatherData ? (
        <>
          <div className="weather-disp-container">
            <div className="location-name">{weatherData.name}</div>
            <div className="country">{weatherData.country}</div>
            <div className="weather-info">
              {dateObj.date?.toString().replace(/-/g, "/")} at {dateObj.time}
            </div>
            <div className="temp-container">
              <div className="temp">{weatherData.temp_c}°</div>
              <div>{weatherData.condition.text}</div>
            </div>
            <div className="weather-stats">
              <WeatherStat
                title="percipitation"
                value={`${weatherData.precip_mm} mm`}
              />
              <WeatherStat
                title="humidity"
                value={`${weatherData.humidity}%`}
              />
              <WeatherStat
                title="wind"
                value={`${weatherData.wind_kph} km/h`}
              />
            </div>
            <HourForecast days={weatherData.forecast.forecastday} />
          </div>
        </>
      ) : (
        <div className="disp-placeholder">{placeholder}</div>
      )}
    </>
  );
};

export default WeatherDisplay;
