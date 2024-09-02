import { useState } from "react";
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
    if (!selected) return;
    const cityArr = cities?.filter((city) => selected.name === city.name);
    console.log(cities);
    if (!cityArr || cityArr?.length === 0) return;
    const querystring = selected.name;
    handleClick(querystring);
  }

  function handleSelect(city: City) {
    setSelected(city);
    setInput(city.name);
  }

  function handleBlur() {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  }
  return (
    <>
      <label className="weather-form-label">City name</label>
      <form className="weather-form" onSubmit={handleSubmit}>
        <input
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
