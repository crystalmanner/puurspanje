import styles from "./Hero.module.scss";
import Link from "next/link";
import { Search } from "@components/common";
import Arrow from "@public/assets/arrow-black.svg";
import Image from "next/image";

export const Hero: React.VFC = () => (
  <section>
    <div className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Image src="/images/home-bg.png" layout="fill" objectFit="cover" />
      </div>
      <div className="container">
        <h1>Vind je woning in de beste regio van Spanje</h1>
      </div>
    </div>
    <div className={styles.heroBottom}>
      <div className="container">
        <Search wrapperClass={styles.searchWrapper} />
        <Link href="/">
          <a>
            Zoekprofiel aanmaken
            <Arrow />
          </a>
        </Link>
      </div>
    </div>
  </section>
);
