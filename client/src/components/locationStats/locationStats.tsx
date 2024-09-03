import { useMemo } from "react";
import "./locationStats.css";
import { formatWeatherDate } from "../../utils/weatherUtils";

interface LocationStatsProps {
  lon: number;
  lat: number;
  accurateTo: string;
}

const LocationStats: React.FC<LocationStatsProps> = ({
  lat,
  lon,
  accurateTo,
}) => {
  const accurateToArray = useMemo(() => accurateTo.split(" "), [accurateTo]);
  const date = formatWeatherDate(accurateToArray[0]);
  const time = accurateToArray[1];
  return (
    <div className="location-container">
      <div>
        <span style={{ marginRight: "1em" }} aria-label="Latitude">
          latitude {lat}
        </span>
        <span aria-label="Longitude">longitude {lon}</span>
      </div>
      <div aria-label="Accuracy information">
        accurate to {date} at {time}
      </div>
    </div>
  );
};

export default LocationStats;
