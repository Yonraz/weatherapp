import { Hour } from "../../types/weatherSchema";
import "./forecastHourItem.css";

interface ForecastHourItemProps {
  hour: Hour;
  tempUnit: "c" | "f";
}

const ForecastHourItem: React.FC<ForecastHourItemProps> = ({
  hour,
  tempUnit,
}) => {
  return (
    <>
      <div className="hour" aria-label={`Hour: ${hour.time.split(" ")[1]}`}>
        {hour.time.split(" ")[1]}
      </div>
      <div
        className="hour-temp"
        aria-label={`Temperature: ${hour[`temp_${tempUnit}`]} degrees ${
          tempUnit === "c" ? "Celsius" : "Fahrenheit"
        }`}
      >
        {hour[`temp_${tempUnit}`]}°
      </div>
    </>
  );
};
export default ForecastHourItem;
