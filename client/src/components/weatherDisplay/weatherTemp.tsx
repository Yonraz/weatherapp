interface WeatherTempProps {
  temp: number;
  condition: string;
}

const WeatherTemp: React.FC<WeatherTempProps> = ({ temp, condition }) => {
  return (
    <section
      aria-label={`Temperature and weather conditions`}
      className="temp-container"
    >
      <div className="temp" aria-label="Temperature">
        {temp}°
      </div>
      <div className="condition" aria-label="Condition">
        {condition}
      </div>
    </section>
  );
};

export default WeatherTemp;
