import "./weatherStat.css";
interface WeatherStatProps {
  title: string;
  value: string;
}

const WeatherStat: React.FC<WeatherStatProps> = ({ title, value }) => {
  return (
    <div className="weather-stat">
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
};

export default WeatherStat;
