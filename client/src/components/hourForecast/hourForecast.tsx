import { ForecastDay } from "../../types/weatherSchema";
import "./hourForecast.css";

interface HourForecastProps {
  day: ForecastDay;
  tempUnit?: "c" | "f";
}

const HourForecast: React.FC<HourForecastProps> = ({ day, tempUnit }) => {
  if (!tempUnit) tempUnit = "c";
  return (
    <div className="weather-stats">
      {day.hour.map((hour, i) => (
        <div className="hour-container" key={i}>
          <div className="hour">{hour.time.split(" ")[1]}</div>
          <div className="hour-temp">{hour[`temp_${tempUnit}`]}°</div>
        </div>
      ))}
    </div>
  );
};
export default HourForecast;
