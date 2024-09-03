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
        <span style={{ marginRight: "1em" }}>latitude {lat}</span>
        <span>longitude {lon}</span>
      </div>
      <div>
        accurate to {date} at {time}
      </div>
    </div>
  );
};

export default LocationStats;
