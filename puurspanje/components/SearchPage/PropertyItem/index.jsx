import Image from "next/image";
import { formatPrice, getMediaUrl } from "lib/utils";
import styles from "./PropertyItem.module.scss";
import Dot from "@public/assets/dot.svg";
import Pin from "@public/assets/pin-gray.svg";

export const PropertyItem = (props) => {
  const { media, name, town, bedrooms = 0, bathrooms = 0, price = 0 } = props;

  const { url = "/404.png", alternativeText: alt = "" } =
    media?.[0]?.images?.[0] || {};

  return (
    <div className={styles.property}>
      <Image
        src={getMediaUrl(url)}
        alt={alt}
        width={260}
        height={160}
        objectFit="cover"
      />
      <div className={styles.content}>
        <h3>{name}</h3>
        <span className={styles.address}>
          <Pin />
          {town?.location?.name || "No address"}
        </span>
        <div className={styles.rooms}>
          <span>{bedrooms} Slaapkamers</span>
          <Dot />
          <span>{bathrooms} Badkamers</span>
        </div>
        <span className={styles.price}>€ {formatPrice(price)}</span>
      </div>
    </div>
  );
};
