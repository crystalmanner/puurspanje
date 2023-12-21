import styles from "./TrustSection.module.scss";
import { trustList } from "../constants";

export const TrustSection = () => (
  <section className={styles.section}>
    <div className="container">
      <h2>Waarom honderden al kozen voor Puurspanje</h2>
      <div className={styles.grid}>
        {trustList.map(({ id, title, body }) => (
          <div key={id}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
