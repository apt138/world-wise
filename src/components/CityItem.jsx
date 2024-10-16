import { Link } from "react-router-dom";
import { formatDate } from "../utils";
import styles from "./CityItem.module.css";
import { useCityContext } from "../contexts/CityContext";

export default function CityItem({ city }) {
  const { curCity, deleteCity } = useCityContext();
  const { cityName, emoji, date, id, position } = city;

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.city} ${
          id === curCity.id ? styles.cityActive : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
