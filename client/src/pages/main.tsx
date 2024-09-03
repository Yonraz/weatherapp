import { useState } from "react";
import WeatherForm from "../components/weatherForm/weatherForm";
import PageContainer from "../components/pageContainer/pageContainer";
import WeatherDisplay from "../components/weatherDisplay/weatherDisplay";
import { WeatherResponse, weatherResponseSchema } from "../types/weatherSchema";
import "./main.css";
import useRequest from "../hooks/useRequest";
import LocationStats from "../components/locationStats/locationStats";

const SERVER_URL = "http://localhost:8000/api/weather";

export default function Main() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | undefined>();
  const { sendRequest, isLoading, requestErrors } = useRequest();

  async function handleClick(query: string) {
    try {
      await sendRequest({
        method: "GET",
        url: `${SERVER_URL}?query=${query}`,
        onSuccess: (value) => {
          console.log(value);
          if (!value) return;
          try {
            const data = weatherResponseSchema.parse(value);
            setWeatherData(data as WeatherResponse);
          } catch (err) {
            console.error(err);
          }
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <PageContainer>
      <div className="main-container">
        <div className="input-container">
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
    </PageContainer>
  );
}
