import styles from "./SellingPoints.module.scss";
import { sellingPoints } from "../constants";

export const SellingPoints = () => (
  <section className={styles.section}>
    <div className="container">
      <h2>De Costa Calida en Costa Blanca Zuid. Voor rust, natuur en zon.</h2>
      <div className={styles.grid}>
        {sellingPoints.map(({ id, title, body }) => (
          <div key={id}>
            <img
              src="/assets/circle-check.svg"
              width="40"
              height="40"
              alt="check icon"
            />
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className={styles.bottomText}>
        Puurspanje is een award-winning makelaar in de Costa Calida en Costa
        Blanca Zuid.
      </p>
    </div>
  </section>
);
