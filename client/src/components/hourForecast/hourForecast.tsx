import { ForecastDay } from "../../types/weatherSchema";
import ForecastHourItem from "./forecastHourItem";
import "./hourForecast.css";

interface HourForecastProps {
  days: ForecastDay[];
  tempUnit?: "c" | "f";
}

const HourForecastList: React.FC<HourForecastProps> = ({ days, tempUnit }) => {
  if (!tempUnit) tempUnit = "c";

  return (
    <div className="weather-stats" role="list" aria-label="Hourly Forecast">
      {days.map((day) =>
        day.hour.map((hour) => (
          <div
            aria-label={`Forecast for ${hour.time.split(" ")[1]}: ${
              hour[`temp_${tempUnit}`]
            } degrees ${tempUnit === "c" ? "Celsius" : "Fahrenheit"}`}
            className="hour-container"
            key={hour.time}
            role="listitem"
          >
            <ForecastHourItem hour={hour} tempUnit={tempUnit} />
          </div>
        ))
      )}
    </div>
  );
};
export default HourForecastList;
