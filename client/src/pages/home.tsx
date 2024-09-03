import { useState } from "react";
import WeatherForm from "../components/weatherForm/weatherForm";
import WeatherDisplay from "../components/weatherDisplay/weatherDisplay";
import logo from "/logo.svg";
import { WeatherResponse, weatherResponseSchema } from "../types/weatherSchema";
import "./home.css";
import useRequest from "../hooks/useRequest";
import LocationStats from "../components/locationStats/locationStats";
import { validateResponse } from "../validations/validateResponse";

const SERVER_URL = "http://localhost:8000/api/weather";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | undefined>();
  const { sendRequest, isLoading, requestErrors } = useRequest();

  async function handleClick(query: string) {
    try {
      await sendRequest({
        method: "GET",
        url: `${SERVER_URL}?query=${query}`,
        onSuccess: (value) => {
          if (!value) return;
          const data = validateResponse(
            weatherResponseSchema,
            value,
            console.error
          );
          setWeatherData(data as WeatherResponse);
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="input-container">
          <img src={logo} alt="fintek logo" className="logo" />
          <div>
            <h1 className="header">
              Use our weather app to see the weather around the world
            </h1>
            <WeatherForm handleClick={handleClick} />
          </div>
          {weatherData && (
            <LocationStats
              lon={weatherData?.lon}
              lat={weatherData.lat}
              accurateTo={weatherData.last_updated}
            />
          )}
        </div>
        <div className="display-container">
          <WeatherDisplay
            weatherData={weatherData}
            isLoading={isLoading}
            hasErrors={
              requestErrors && requestErrors?.length > 0 ? true : false
            }
          />
        </div>
      </div>
    </div>
  );
}
