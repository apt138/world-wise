import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import { useCityContext } from "../contexts/CityContext";

export default function CountryList() {
  const { cities, isLoading } = useCityContext();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add you first city by clicking the city on the map." />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((city) => city.name).includes(city.country))
      return [...arr, { name: city.country, emoji: city.emoji }];

    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.name} />
      ))}
    </ul>
  );
}
