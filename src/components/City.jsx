import { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useCityContext } from "../contexts/CityContext";
import styles from "./City.module.css";
import { formatDate } from "../utils";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";

export default function City() {
  const { curCity, getCity, isLoading } = useCityContext();
  const { id: cityId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { cityName, emoji, notes, date } = curCity;
  console.log(curCity);

  useEffect(
    function () {
      getCity(cityId);
    },
    [cityId, getCity]
  );
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span>
          {cityName}
        </h3>
      </div>

      {date && (
        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date, true)}</p>
        </div>
      )}

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div className={styles.row}>
        <ButtonBack />
      </div>
    </div>
  );
}
