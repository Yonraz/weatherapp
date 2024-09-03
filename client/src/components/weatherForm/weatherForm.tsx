import { useEffect, useState } from "react";
import "./weatherForm.css";
import { City } from "../../types/cityData";
import CityDropdown from "../cityDropdown/cityDropdown";

interface InputProps {
  handleClick: (query: string) => void;
}

const WeatherForm: React.FC<InputProps> = ({ handleClick }) => {
  const [cities, setCities] = useState<City[] | undefined>();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<City | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let query = selected;
    if (!query) {
      if (cities && cities.length > 0) {
        query = cities[0];
        handleSelect(query);
      } else return;
    }
    const querystring = query.name;
    handleClick(querystring);
  }

  useEffect(() => {
    setSelected(undefined);
  }, [cities]);

  function handleSelect(city: City) {
    setSelected(city);
    setInput(city.name);
    setIsDropdownOpen(false);
  }

  function handleBlur() {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  }
  return (
    <>
      <label htmlFor="city-input" className="weather-form-label">
        City name
      </label>
      <form className="weather-form" onSubmit={handleSubmit}>
        <input
          id="city-input"
          className="weather-form-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={handleBlur}
        />

        <button type="submit" className="input-btn">
          Check
        </button>
      </form>
      <div className="dropdown-container">
        <CityDropdown
          cities={cities}
          isOpen={isDropdownOpen}
          setCities={setCities}
          setSelected={handleSelect}
          query={input}
        />
      </div>
    </>
  );
};

export default WeatherForm;
