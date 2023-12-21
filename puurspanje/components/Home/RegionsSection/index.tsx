import { useBreakpoint } from "lib/useBreakpoint";
import Image from "next/image";
import Link from "next/link";
import styles from "./RegionsSection.module.scss";
import Arrow from "@public/assets/arrow-orange.svg";
import { provinces } from "../constants";
import { useMemo } from "react";

export const RegionsSection = () => {
  const bp = useBreakpoint();
  let items = useMemo(() => {
    if (!bp.lg) {
      return provinces.map((province) => ({
        ...province,
        regions: province.regions.slice(0, 3),
      }));
    }
    return provinces;
  }, [bp, provinces]);

  return (
    <section className="container">
      <h2 className={styles.title}>Wonen in Spanje</h2>
      <ul className={styles.provinces}>
        {items.map((province) => (
          <li className={styles.province} key={province.name}>
            <Link href={province.href}>
              <h3>
                <a>Huis kopen in {province.name}</a>
              </h3>
            </Link>
            <Link href={province.href}>
              <div className={styles.imageWrapper}>
                <a>
                  <Image
                    src={province.img.url}
                    alt={province.img.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </a>
              </div>
            </Link>
            <ul className={styles.regions}>
              {province.regions.map((region) => (
                <li key={province.name + region.name}>
                  <Link href={region.href}>
                    <a className={styles.region}>
                      <div className={styles.regionImage}>
                        <Image
                          src={region.img.url}
                          alt={region.img.alt}
                          objectFit="cover"
                          width="80"
                          height="80"
                        />
                      </div>
                      <div className={styles.info}>
                        <h3>{region.name}</h3>
                        <p>{region.location}</p>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
              {!bp.lg && (
                <li>
                  <Link href={province.moreRegions}>
                    <a className={styles.linkMore}>
                      Alle steden <Arrow />
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
