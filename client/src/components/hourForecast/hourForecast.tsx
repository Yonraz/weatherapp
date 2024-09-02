import { ForecastDay } from "../../types/weatherSchema";
import "./hourForecast.css";

interface HourForecastProps {
  days: ForecastDay[];
  tempUnit?: "c" | "f";
}

const HourForecast: React.FC<HourForecastProps> = ({ days, tempUnit }) => {
  if (!tempUnit) tempUnit = "c";
  return (
    <div className="weather-stats">
      {days.map((day) =>
        day.hour.map((hour, i) => (
          <div className="hour-container" key={i}>
            <div className="hour">{hour.time.split(" ")[1]}</div>
            <div className="hour-temp">{hour[`temp_${tempUnit}`]}°</div>
          </div>
        ))
      )}
    </div>
  );
};
export default HourForecast;
