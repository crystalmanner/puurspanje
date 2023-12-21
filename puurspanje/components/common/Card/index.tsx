import styles from "./Card.module.scss";
import Image from "next/image";

export interface CardProps {
  title: string | React.ReactElement;
  subtitle: string | React.ReactElement;
  img: string;
}

export const Card: React.VFC<CardProps> = (props) => (
  <div className={styles.card}>
    <Image
      src={props.img}
      alt="card image"
      width="360"
      height="270"
      objectFit="cover"
    />
    <div className={styles.cardBody}>
      <h3>{props.title}</h3>
      <p>{props.subtitle}</p>
    </div>
  </div>
);
