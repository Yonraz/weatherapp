import { Fragment } from "react/jsx-runtime";
import { City } from "../../types/citySchema";

interface CityItemProps {
  name: string;
  country: string;
}

const CityItem: React.FC<CityItemProps> = ({ name, country }) => {
  return (
    <Fragment>
      <div className="city-header">{name}</div>
      <div className="city-subheader">{country}</div>
    </Fragment>
  );
};

interface CityListProps {
  cities: City[] | undefined;
  handleClick: (city: City) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, handleClick }) => {
  return (
    <Fragment>
      <ul role="list" className="cities-list">
        {cities &&
          cities.map((city) => (
            <li
              key={`${city.longitude}/${city.lattitude}/${city.name}`}
              onClick={() => handleClick(city)}
              role="option"
              className={` dropdown-item`}
            >
              <CityItem name={city.name} country={city.country} />
            </li>
          ))}
      </ul>
    </Fragment>
  );
};

export default CityList
