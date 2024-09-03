import { Fragment } from "react/jsx-runtime";
import WeatherInfo from "./weatherStat";

interface WeatherInfoListProps {
  list?: { title: string; value: string }[];
}

const WeatherInfoList: React.FC<WeatherInfoListProps> = ({ list }) => {
  return (
    <div className="weather-stats">
      {list &&
        list.map((info) => (
          <Fragment key={info.title}>
            <WeatherInfo title={info.title} value={info.value} />
          </Fragment>
        ))}
    </div>
  );
};

export default WeatherInfoList;
