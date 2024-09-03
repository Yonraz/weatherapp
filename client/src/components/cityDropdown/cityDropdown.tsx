import { City } from "../../types/citySchema";
import "./cityDropdown.css";
import { RequestError } from "../../types/requestTypes";

interface CityDropdownProps {
  query: string;
  setSelected: (city: City) => void;
  cities: City[] | undefined;
  isLoading: boolean;
  requestErrors: RequestError[] | null;
  isOpen: boolean;
}

const CityDropdown: React.FC<CityDropdownProps> = ({
  query,
  setSelected,
  cities,
  isLoading,
  requestErrors,
  isOpen,
}) => {
  
  function handleClick(city: City) {
    setSelected(city);
  }

  return (
    isOpen && (
      <>
        <div className="cities-dropdown" aria-expanded={isOpen} role="listbox">
          {isLoading && <li className="info">Loading...</li>}
          {query.length > 2 &&
            requestErrors &&
            requestErrors.map((err, i) => (
              <li key={i} className="error">
                {err.message}
              </li>
            ))}
          {query.length < 3 && (
            <li className="info">type more than 3 characters</li>
          )}
          <ul role="list" className="cities-list">
            {cities &&
              cities.map((city) => (
                <li
                  key={`${city.longitude}/${city.lattitude}/${city.name}`}
                  onClick={() => handleClick(city)}
                  role="option"
                  className={` dropdown-item`}
                >
                  <div className="city-header">{city.name}</div>
                  <div className="city-subheader">{city.country}</div>
                </li>
              ))}
          </ul>
        </div>
      </>
    )
  );
};

export default CityDropdown;
