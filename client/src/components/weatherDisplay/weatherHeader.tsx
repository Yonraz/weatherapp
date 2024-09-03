import { Fragment } from "react/jsx-runtime";

interface WeatherHeaderProps {
  name: string;
  country: string;
  date: string;
  time: string;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  name,
  country,
  date,
  time,
}) => {
  return (
    <Fragment>
      <div className="location-name" aria-label="Location">
        {name}
      </div>
      <div className="country" aria-label="Country">
        {country}
      </div>
      <div className="weather-info" aria-label="Local time">
        {date} at {time}
      </div>
    </Fragment>
  );
};

export default WeatherHeader;
