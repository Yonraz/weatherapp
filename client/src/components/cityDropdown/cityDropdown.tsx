import { City } from "../../types/citySchema";
import "./cityDropdown.css";
import { RequestError } from "../../types/requestTypes";
import RequestErrors from "../errors/requestErrors";
import CityList from "./cityList";

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
          {query.length > 2 && <RequestErrors errors={requestErrors} />}
          {query.length < 3 && (
            <li className="info">type more than 3 characters</li>
          )}
          <CityList cities={cities} handleClick={handleClick} />
        </div>
      </>
    )
  );
};

export default CityDropdown;
