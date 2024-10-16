import { Link } from "react-router-dom";
import styles from "./Hompage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world. <br /> WorldWise keeps tracks of your
          adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forger you wonderful experiences, and show you friends how
          you have wandered the world.
        </h2>
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
