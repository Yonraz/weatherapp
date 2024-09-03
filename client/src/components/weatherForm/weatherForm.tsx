import "./weatherForm.css";
import CityDropdown from "../cityDropdown/cityDropdown";
import useWeatherForm from "../../hooks/useWeatherForm";
import useRequest from "../../hooks/useRequest";
import { useCallback } from "react";
import { debounce } from "../../utils/debounce";
import { City } from "../../types/citySchema";

interface InputProps {
  handleClick: (query: string) => void;
}

const WeatherForm: React.FC<InputProps> = ({ handleClick }) => {
  const { sendRequest, isLoading, requestErrors } = useRequest();
  const {
    setCities,
    cities,
    input,
    setInput,
    setIsDropdownOpen,
    isDropdownOpen,
    handleSelect,
    handleSubmit,
    handleBlur,
  } = useWeatherForm({ onSubmit: handleClick });

  const fetchCities = useCallback(
    async (value: string) => {
      await sendRequest({
        url: `http://localhost:8000/api/cities?query=${value}`,
        method: "GET",
        onSuccess: (data: unknown) => {
          try {
            setCities(data as City[]);
          } catch (err) {
            console.error(err);
          }
        },
      });
    },
    [sendRequest, setCities]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setInput(value);
    if (value.length < 3) {
      setCities(undefined);
      return;
    }

    const debouncedFetchCities = debounce(fetchCities, 300);

    debouncedFetchCities(value);
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
          onChange={handleChange}
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
          isLoading={isLoading}
          requestErrors={requestErrors}
          setSelected={handleSelect}
          query={input}
        />
      </div>
    </>
  );
};

export default WeatherForm;
