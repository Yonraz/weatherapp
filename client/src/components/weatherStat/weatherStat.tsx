import "./weatherStat.css";
interface WeatherInfoProps {
  title: string;
  value: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ title, value }) => {
  return (
    <div
      className="weather-stat"
      aria-label={`Weather information for ${title}`}
    >
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
};

export default WeatherInfo;
