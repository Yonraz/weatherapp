import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { City } from "../../types/cityData";
import "./cityDropdown.css";

interface CityDropdownProps {
  query: string;
  setSelected: (city: City) => void;
  cities: City[] | undefined;
  setCities: (data: City[] | undefined) => void;
  isOpen: boolean;
}

const CityDropdown: React.FC<CityDropdownProps> = ({
  query,
  setSelected,
  cities,
  setCities,
  isOpen,
}) => {
  const { sendRequest, isLoading, requestErrors } = useRequest();

  useEffect(() => {
    if (query.length < 3) {
      setCities(undefined);
      return;
    }
    async function fetchCities() {
      await sendRequest({
        url: `http://localhost:8000/api/cities?query=${query}`,
        method: "GET",
        onSuccess: (data: unknown) => {
          try {
            setCities(data as City[]);
          } catch (err) {
            console.error(err);
          }
        },
      });
    }
    fetchCities();
  }, [query, sendRequest, setCities]);

  function handleClick(city: City) {
    setSelected(city);
  }

  return (
    isOpen && (
      <>
        <div className="cities-dropdown" aria-expanded={isOpen} role="listbox">
          {isLoading && <li className="info">Loading...</li>}
          {query.length > 3 &&
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
