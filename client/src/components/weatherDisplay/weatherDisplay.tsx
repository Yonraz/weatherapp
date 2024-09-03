import { WeatherResponse } from "../../types/weatherSchema";
import HourForecastList from "../hourForecast/hourForecast";
import "./weatherDisplay.css";
import { useMemo } from "react";
import { getDateTimeObjectFromWeather } from "../../utils/weatherUtils";
import WeatherInfoList from "../weatherStat/weatherInfoList";

interface WeatherDisplayProps {
  weatherData?: WeatherResponse;
  isLoading: boolean;
  hasErrors?: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  isLoading,
  hasErrors,
}) => {
  const dateObj = useMemo(
    () => getDateTimeObjectFromWeather(weatherData),
    [weatherData]
  );

  const weatherInfo = useMemo(
    () =>
      weatherData && [
        { title: "percipitation", value: `${weatherData?.precip_mm} mm` },
        { title: "humidity", value: `${weatherData?.humidity}%` },
        { title: "wind", value: `${weatherData?.wind_kph} km/h` },
      ],
    [weatherData]
  );

  const placeholder = useMemo(() => {
    if (isLoading) return "Loading...";
    if (hasErrors) return "There has been an error, please try again";
    return "Search to view weather data";
  }, [isLoading, hasErrors]);
  return (
    <>
      {weatherData && !isLoading && !hasErrors ? (
        <>
          <section
            className="weather-disp-container"
            aria-label={`Weather information for ${weatherData.name}`}
          >
            <div className="location-name" aria-label="Location">
              {weatherData.name}
            </div>
            <div className="country" aria-label="Country">
              {weatherData.country}
            </div>
            <div className="weather-info" aria-label="Local time">
              {dateObj?.date} at {dateObj?.time}
            </div>
            <section
              aria-label={`Temperature and weather conditions`}
              className="temp-container"
            >
              <div className="temp" aria-label="Temperature">
                {weatherData.temp_c}°
              </div>
              <div className="condition" aria-label="Condition">
                {weatherData.condition.text}
              </div>
            </section>
            <WeatherInfoList list={weatherInfo} />
            <HourForecastList days={weatherData.forecast.forecastday} />
          </section>
        </>
      ) : (
        <p className="disp-placeholder">{placeholder}</p>
      )}
    </>
  );
};

export default WeatherDisplay;
