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
  }, [query]);

  function handleClick(city: City) {
    console.log(city);
    setSelected(city);
  }
  return (
    isOpen && (
      <>
        <div className="cities-dropdown">
          {isLoading && <div className="info">Loading...</div>}
          {query.length > 3 &&
            requestErrors &&
            requestErrors.map((err, i) => (
              <div key={i} className="error">
                {err.message}
              </div>
            ))}
          {query.length < 3 && (
            <div className="info">start typing to load cities</div>
          )}
          {cities &&
            cities.map((city) => (
              <li
                key={`${city.longitude}/${city.lattitude}`}
                onClick={() => handleClick(city)}
              >
                <div className="city-header">{city.name}</div>
                <div className="city-subheader">{city.country}</div>
              </li>
            ))}
        </div>
      </>
    )
  );
};

export default CityDropdown;
