import styles from "./TopBanner.module.scss";
import Link from "next/link";
import Call from "@public/assets/call.svg";
import cn from "classnames";

export const TopBanner = () => (
  <div className={styles.topBanner}>
    <div className={cn("container", styles.container)}>
      <div className={styles.reviews}>
        <div className={styles.rating}>
          <img src="/assets/star.svg" alt="star" width="16" height="16" />
          <img src="/assets/star.svg" alt="star" width="16" height="16" />
          <img src="/assets/star.svg" alt="star" width="16" height="16" />
          <img src="/assets/star.svg" alt="star" width="16" height="16" />
          <img src="/assets/star.svg" alt="star" width="16" height="16" />
        </div>
        <span>65 reviews op Facebook</span>
      </div>
      <ul>
        <li>
          <Link href="/">
            <a className={styles.call}>
              <Call />
              +34 6 1824 5967
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Belverzoek</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Contact</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Inloggen</a>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
