import { useEffect, useState } from "react";
import { City } from "../types/citySchema";
interface UseWeatherFormProps {
  onSubmit: (query: string) => void;
}

export default function useWeatherForm({ onSubmit }: UseWeatherFormProps) {
  const [cities, setCities] = useState<City[] | undefined>();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<City | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selected && (!cities || cities.length === 0)) {
      return;
    }
    const query = selected || cities![0];

    const querystring = `${query.name}, ${query.country}`;
    handleSelect(query);
    onSubmit(querystring);
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
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
    return () => clearTimeout(timeout);
  }

  return {
    setCities,
    cities,
    input,
    setInput,
    setIsDropdownOpen,
    isDropdownOpen,
    selected,
    handleSelect,
    handleSubmit,
    handleBlur,
  };
}
